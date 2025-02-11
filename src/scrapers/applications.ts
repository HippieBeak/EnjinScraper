const sqlite3 = require('sqlite3').verbose();
import { Applications } from '../interfaces/applications';
import { getErrorMessage } from '../util/error';
import { addExitListeners, removeExitListeners } from '../util/exit';
import { enjinRequest } from '../util/request';
import { fileExists, parseJsonFile, writeJsonFile } from '../util/files';
import { Database } from 'sqlite3';
import { insertApplicationsTable } from '../util/database';

async function getApplicationTypes(domain: string): Promise<string[]> {
    const data = await enjinRequest<Applications.GetTypes>({}, 'Applications.getTypes', domain);

    if (data.error) {
        console.log(`Error getting application types: ${data.error.code} ${data.error.message}`)
        return [];
    }

    const { result } = data;
    return Object.keys(result);
}

async function getApplicationIDs(domain: string, types: string[], sessionID: string, siteID: string): Promise<string[]> {
    console.log('Getting application IDs...');
    const applicationIDs: string[] = [];

    await Promise.all(types.map(async (type) => {
        let page = 1;
        try {
            while (true) {
                console.log(`Getting application IDs for type ${type} page ${page}...`);

                const params = {
                    session_id: sessionID,
                    type,
                    site_id: siteID,
                    page,
                }

                const data = await enjinRequest<Applications.GetList>(params, 'Applications.getList', domain);

                if (data.error) {
                    console.log(`Error getting application IDs for application type ${type} on page ${page}: ${data.error.code} ${data.error.message}`)
                    break;
                }

                const { result } = data;
                if (result.items.length === 0) {
                    break;
                }
                applicationIDs.push(...result.items.map((item: { application_id: string }) => item.application_id));
                page++;
            }
        } catch (error) {
            console.log(`Error getting application IDs: ${getErrorMessage(error)}`);
        }
    }));

    return applicationIDs;
}

export async function getApplications(database: Database, domain: string, sessionID: string, siteID: string): Promise<Applications.GetApplication[]> {
    console.log('Getting applications...');
    const applications: Applications.GetApplication[] = [];

    const applicationTypes = await getApplicationTypes(domain);
    console.log(`Application types: ${applicationTypes.join(', ')}`);

    let applicationIDs: string[] = [];
    if (fileExists('./target/recovery/application_progress.json')) {
        console.log('Found recovery file, skipping application ID retrieval.');
        applicationIDs = parseJsonFile('./target/recovery/application_progress.json') as string[];
    } else {
        applicationIDs = await getApplicationIDs(domain, applicationTypes, sessionID, siteID);
        writeJsonFile('./target/recovery/application_progress.json', applicationIDs);
    }

    const totalApplications = applicationIDs.length;
    console.log(`Found ${totalApplications} to download.`)

    let currentApplication = 1;

    if (fileExists('./target/recovery/applications.json')) {
        console.log('Found recovery applications file, starting where we left off.');
        applications.push(...parseJsonFile('./target/recovery/applications.json') as Applications.GetApplication[]);
        applicationIDs = applicationIDs.filter((id) => !applications.some((application) => application.application_id === id));
        currentApplication = applications.length + 1;
    }

    addExitListeners(['./target/recovery/applications.json'], [applications]);

    try {
        for (const id of applicationIDs) {
            console.log(`Getting application ${id}... (${currentApplication++}/${totalApplications})`);

            const params = {
                session_id: sessionID,
                application_id: id,
            }

            const data = await enjinRequest<Applications.GetApplication>(params, 'Applications.getApplication', domain);

            if (data.error) {
                console.log(`Error getting application ${id}: ${data.error.code} ${data.error.message}`)
                continue;
            }

            const { result } = data;
            applications.push(result);
        }
    } catch (error) {
        console.log(`Error getting applications: ${getErrorMessage(error)}`);
    }

    removeExitListeners();
    for (const app of applications) {
        insertApplicationsTable(database, app);
    }
    return applications;
}