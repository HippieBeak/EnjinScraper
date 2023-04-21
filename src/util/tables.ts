import { TableSchema } from "../interfaces/tableschema";

export const tableSchemas: TableSchema[] = [
    // Util
    {
        name: 'scrapers',
        schema:[
            'module TEXT PRIMARY KEY',
            'scraped BOOLEAN'
        ]
    },

    // Site Data
    {
        name: 'module_categories',
        schema: [
            'category_id TEXT PRIMARY KEY',
            'title TEXT',
            `'order' TEXT`,
            'platform TEXT',
            'webpush_title TEXT',
            'regular_title TEXT'
        ]
    },
    {
        name: 'modules',
        schema: [
            'rid TEXT',
            'category_id TEXT',
            'module_id TEXT PRIMARY KEY',
            'title TEXT',
            'description TEXT',
            'image TEXT',
            `'order' TEXT`,
            'platform TEXT',
            'webpush_title TEXT',
            'listed TEXT',
            'allow_create TEXT',
            'module_type TEXT',
            'help_guide_url TEXT',
            'notes TEXT',
            'min_width TEXT',
            'video_html TEXT',
            'released TEXT'
        ]
    },
    {
        name: 'presets',
        schema: [
            'preset_id TEXT PRIMARY KEY',
            'category_id TEXT',
            'name TEXT',
            'admin_access TEXT',
            'admin_access_tags TEXT',
            'disabled BOOLEAN',
            'module_id TEXT REFERENCES modules(module_id)',
            'module_type TEXT'
        ]
    },
    {
        name: 'pages',
        schema: [
            'site_id TEXT',
            'url TEXT',
            'page_id TEXT PRIMARY KEY',
            'pagename TEXT',
            'section_id TEXT',
            'section_type TEXT',
            'section_width TEXT',
            'section_type2 TEXT',
            'section_name TEXT',
            'container_id TEXT',
            'container_title TEXT',
            'container_footer TEXT',
            'container_footer_url TEXT',
            'container_footer_window TEXT',
            'container_position TEXT',
            'container_graphics TEXT',
            'rows TEXT',
            'columns TEXT',
            'acl_access TEXT',
            'collapsible_container TEXT',
            'start_collapsed TEXT',
            'rid TEXT',
            'preset_id TEXT REFERENCES presets(preset_id)',
            'row TEXT',
            'column TEXT',
            'module_width TEXT',
            'module_name TEXT',
            'disabled TEXT',
            'module_type TEXT',
        ]
    },
    {
        name: 'site_data',
        schema: [
            'site_id TEXT PRIMARY KEY',
            'sites_games JSON',
            'plan JSON',
            'licenses JSON',
        ]
    },

    // Forums
    {
        name: 'forum_modules',
        schema: [
            'preset_id TEXT PRIMARY KEY',
            'title_welcome TEXT',
            'subforums JSON',
            'total_threads INTEGER',
            'total_posts INTEGER',
            'category_names JSON',
            'notice JSON'
        ]
    },
    {
        name: 'forums',
        schema: [
            'title_welcome TEXT',
            'show_forum_viewers TEXT',
            'preset_id TEXT REFERENCES forum_modules(preset_id)',
            'category_id TEXT',
            'forum_id TEXT PRIMARY KEY',
            'category_name TEXT',
            'category_order TEXT',
            'collapsed TEXT',
            'forum_name TEXT',
            'forum_description TEXT',
            'view_access TEXT',
            'view_access_tag TEXT',
            'post_access TEXT',
            'post_access_tag TEXT',
            'moderation_access TEXT',
            'moderation_access_tag TEXT',
            'forum_order TEXT',
            'forum_threads TEXT',
            'forum_posts TEXT',
            'forum_lastthread_id TEXT',
            'poll_enabled TEXT',
            'email_notifications TEXT',
            'parent_id TEXT',
            'disable_signature TEXT',
            'disable_user_post_count TEXT',
            'disable_voting TEXT',
            'fb_like_enabled TEXT',
            'twitter_enabled TEXT',
            'disable_sharing_links TEXT',
            'remove_filters TEXT',
            'users_see_own_threads TEXT',
            'minimum_posts_to_post TEXT',
            'minimum_posts_to_view TEXT',
            'forum_type TEXT',
            'redirect_url TEXT',
            'redirect_type TEXT',
            'bottom_breadcrumbs TEXT',
            'unread_icon TEXT',
            'read_icon TEXT',
            'lock_own_threads TEXT',
            'users_see_own_edit TEXT',
            'character_game_rid TEXT',
            'character_game_serverid TEXT',
            'unlock_own_threads TEXT',
            'disable_sharing_images TEXT',
            'thread_id TEXT',
            'thread_subject TEXT',
            'thread_lastpost_time TEXT',
            'thread_lastpost_user_id TEXT',
            'thread_lastpost_username TEXT',
            'thread_replies TEXT',
            'user_id TEXT',
            'username TEXT',
            'displayname TEXT',
            'subscription TEXT',
            'read_time TEXT',
            'category_collapsed_state TEXT',
            'unread BOOLEAN',
            'is_collapsed BOOLEAN',
            'parent_forum_name TEXT',
            'parent_forum_name_2 TEXT',
            'parent_forum_id_2 TEXT',
            'require_game_character BOOLEAN',
            'logo_url TEXT',
            'unread_threads INTEGER',
            'announcement_global JSON',
            'announcement_local JSON',
            'sticky JSON',
            'notices JSON',
        ],
    },
    {
        name: 'threads',
        schema: [
            'forum_id TEXT REFERENCES forums(forum_id)',
            'preset_id TEXT REFERENCES forum_modules(preset_id)',
            'thread_id TEXT PRIMARY KEY',
            'thread_subject TEXT',
            'thread_replies TEXT',
            'thread_views TEXT',
            'thread_type TEXT',
            'thread_status TEXT',
            'thread_user_id TEXT',
            'thread_username TEXT',
            'thread_avatar TEXT',
            'thread_lastpost_user_id TEXT',
            'thread_lastpost_username TEXT',
            'thread_lastpost_time TEXT',
            'username TEXT',
            'thread_moved_id TEXT',
            'thread_post_time TEXT',
            'url TEXT',
            'post_count TEXT',
            'category_id TEXT',
            'subscription TEXT',
            'moved_forum_id TEXT',
            'thread_hot BOOLEAN',
            'thread_new BOOLEAN',
            'replied_to BOOLEAN',
            'avatar TEXT',
            'unread_posts TEXT',
            'labels TEXT',
            'forum_name TEXT',
            'forum_description TEXT',
            'disable_voting TEXT',
            'show_signature TEXT',
            'url_cms TEXT',
        ],
    },
    {
        name: 'posts',
        schema: [
            'post_id TEXT PRIMARY KEY',
            'post_time TEXT',
            'post_content TEXT',
            'post_content_html TEXT',
            'post_content_clean TEXT',
            'post_user_id TEXT',
            'show_signature TEXT',
            'last_edit_time TEXT',
            'post_votes TEXT',
            'post_unhidden TEXT',
            'post_admin_hidden TEXT',
            'post_locked TEXT',
            'last_edit_user TEXT',
            'votes JSON',
            'post_username TEXT',
            'avatar TEXT',
            'user_online BOOLEAN',
            'user_votes TEXT',
            'user_posts TEXT',
            'url TEXT',
        ],
    },

    // Wikis
    {
        name: 'wiki_pages',
        schema: [
            'preset_id TEXT',
            'page_id TEXT PRIMARY KEY',
            'page_namespace TEXT',
            'page_title TEXT',
            'page_is_redirect TEXT',
            'page_is_new TEXT',
            'page_touched TEXT',
            'page_links_updated TEXT',
            'page_latest TEXT',
            'page_len TEXT',
            'page_content_model TEXT',
            'page_lang TEXT',
            'view_access_acl TEXT',
            'edit_access_acl TEXT',
            'comment_access_acl TEXT',
            'rev_id TEXT',
            'rev_timestamp TEXT',
            'rev_user TEXT',
            'rev_user_text TEXT',
            'rev_comment TEXT',
            'rev_parent_id TEXT',
            'text_text TEXT',
            'rd_title TEXT',
            'page_title_display TEXT',
            'current_timestamp INTEGER',
            'view_access TEXT',
            'edit_access TEXT',
            'comment_access TEXT',
            'avatar TEXT',
            'text_display TEXT',
            'categories JSON',
            'comments_total TEXT',
            'comment_cid TEXT',
            'likes_total TEXT',
        ],
    },
    {
        name: 'wiki_revisions',
        schema: [
            'preset_id TEXT',
            'page_id TEXT',
            'page_namespace TEXT',
            'page_title TEXT',
            'page_is_redirect TEXT',
            'page_is_new TEXT',
            'page_is_touched TEXT',
            'page_links_updated TEXT',
            'page_latest TEXT',
            'page_len TEXT',
            'page_content_model TEXT',
            'page_lang TEXT',
            'view_access_acl TEXT',
            'edit_access_acl TEXT',
            'comment_access_acl TEXT',
            'rev_id TEXT PRIMARY KEY',
            'rev_timestamp TEXT',
            'rev_user TEXT',
            'rev_user_text TEXT',
            'rev_comment TEXT',
            'rev_parent_id TEXT',
            'rev_minor_edit TEXT',
            'rev_deleted TEXT',
            'rev_len TEXT',
            'rev_sha1 TEXT',
            'rev_content_format TEXT',
            'rev_content_model TEXT',
            'avatar TEXT',
            'text_text TEXT',
            'rd_title TEXT',
            'page_title_display TEXT',
            'current_timestamp TEXT',
            'view_access TEXT',
            'edit_access TEXT',
            'comment_access TEXT',
            'text_display TEXT',
            'categories JSON',
        ],
    },
    {
        name: 'wiki_likes',
        schema: [
            'preset_id TEXT',
            'page_id TEXT',
            'user_id TEXT',
            'username TEXT',
            'avatar TEXT',
        ],
    },
    {
        name: 'wiki_categories',
        schema: [
            'preset_id TEXT',
            'page_title TEXT',
            'page_title_dbkey TEXT',
            'page_title_display TEXT',
            'category_thumbnail TEXT',
            'category_thumbnail_path TEXT',
            'cl_to TEXT',
            'cl_type TEXT',
        ]
    },
    {
        name: 'wiki_uploads',
        schema: [
            'preset_id TEXT',
            'path TEXT',
            'name TEXT',
        ]
    },

    // News
    {
        name: 'news_articles',
        schema: [
            'article_id TEXT PRIMARY KEY',
            'module_id TEXT',
            'user_id TEXT',
            'num_comments INTEGER',
            'timestamp TEXT',
            'status TEXT',
            'title TEXT',
            'content TEXT',
            'commenting_mode TEXT',
            'ordering TEXT',
            'sticky TEXT',
            'last_updated TEXT',
            'username TEXT',
            'displayname TEXT',
            'comment_cid TEXT',
        ],
    },

    // Comments (News and Applications)
    {
        name: 'comments',
        schema: [
            'comment_cid TEXT',
            'comment_id TEXT PRIMARY KEY',
            'user_id TEXT',
            'guest_ip TEXT',
            'guest_name TEXT',
            'timestamp TEXT',
            'content TEXT',
            'status TEXT',
            'category TEXT',
            'parent_comment_id TEXT',
            'likes_user_ids JSON',
            'likes JSON',
            'likes_users TEXT',
            'likes_users_full TEXT',
            'ajax_like TEXT',
            'can_delete BOOLEAN',
            'can_reply BOOLEAN',
            'avatar TEXT',
            'username TEXT',
            'time TEXT',
            'can_like BOOLEAN',
            'like_text TEXT',
            'tag_post_color BOOLEAN'
        ],
    },

    // Tickets
    {
        name: 'ticket_modules',
        schema: [
            'preset_id TEXT PRIMARY KEY', 
            'module_name TEXT',
        ],
    },
    {
        name: 'ticket_questions',
        schema: [
            'id TEXT PRIMARY KEY',
            'site_id TEXT',
            'preset_id TEXT',
            'type TEXT',
            'label TEXT',
            'required TEXT',
            'bold TEXT',
            'help_text TEXT',
            `'order' TEXT`,
            'other_options JSON',
            'options JSON',
            'conditions JSON',
            'condition_qualify TEXT',
            'system TEXT',
        ],
    },
    {
        name: 'tickets',
        schema: [
            'id TEXT PRIMARY KEY',
            'code TEXT',
            'site_id TEXT',
            'preset_id TEXT',
            'subject TEXT',
            'created TEXT',
            'status TEXT',
            'assignee TEXT',
            'updated TEXT',
            'requester TEXT',
            'priority TEXT',
            'extra_questions TEXT',
            'status_change TEXT',
            'email TEXT',
            'viewers BOOLEAN',
            'createdHTML TEXT',
            'updatedHTML TEXT',
            'requesterHTML TEXT',
            'assigneeText TEXT',
            'assigneeHTML TEXT',
            'priority_name TEXT',
            'replies_count INTEGER',
            'private_reply_count INTEGER',
            'has_replies BOOLEAN',
            'has_uploads BOOLEAN',
            'uploads JSON'
        ],
    },
    {
        name: 'ticket_replies',
        schema: [
            'id TEXT PRIMARY KEY',
            'ticket_id TEXT',
            'ticket_code TEXT',
            'preset_id TEXT',
            'sent TEXT',
            'text TEXT',
            'user_id TEXT',
            'mode TEXT',
            'origin TEXT',
            'agent TEXT',
            'userHTML TEXT',
            'createdHTML TEXT',
            'username TEXT',
        ],
    },

    // Applications
    {
        name: 'application_responses',
        schema: [
            'application_id TEXT PRIMARY KEY',
            'site_id TEXT',
            'preset_id TEXT',
            'title TEXT',
            'user_ip TEXT',
            'is_mine BOOLEAN',
            'can_manage BOOLEAN',
            'created TEXT',
            'updated TEXT',
            'read TEXT',
            'comments INTEGER',
            'read_comments TEXT',
            'app_comments TEXT',
            'admin_comments TEXT',
            'site_name TEXT',
            'user_id TEXT',
            'is_online BOOLEAN',
            'admin_online BOOLEAN',
            'username TEXT',
            'avatar TEXT',
            'admin_user_id TEXT',
            'admin_username TEXT',
            'admin_avatar TEXT',
            'site_logo TEXT',
            'user_data JSON',
            'is_archived BOOLEAN',
            'is_trashed BOOLEAN',
            'allow_app_comments STRING',
            'post_app_comments BOOLEAN',
            'allow_admin_comments BOOLEAN',
            'comment_cid TEXT',
            'admin_comment_cid TEXT',
        ],
    },
    {
        name: 'applications',
        schema: [
            'preset_id TEXT PRIMARY KEY',
            'title TEXT',
            'post_app_comments BOOLEAN',
            'allow_admin_comments BOOLEAN',
        ]
    },
    {
        name: 'application_sections',
        schema: [
            'section_id TEXT PRIMARY KEY',
            'preset_id TEXT REFERENCES applications(preset_id)',
            'title TEXT',
            'new_page TEXT',
            'hide_title TEXT',
            'delta TEXT',
            'description TEXT',
            'conditions JSON',
            'visible BOOLEAN',
            'header TEXT',
        ]
    },
    {
        name: 'application_questions',
        schema: [
            'hash TEXT PRIMARY KEY',
            'preset_id TEXT REFERENCES applications(preset_id)',
            'delta TEXT',
            'data JSON',
            'conditions JSON',
            'section_id TEXT',
            'data_old JSON',
            'visible BOOLEAN',
            'widget TEXT',
        ]
    },

    // Users
    {
        name: 'users',
        schema: [
            'user_id TEXT PRIMARY KEY',
            'username TEXT',
            'forum_post_count TEXT',
            'forum_votes TEXT',
            'lastseen TEXT',
            'datejoined TEXT',
            'points_total TEXT',
            'points_day TEXT',
            'points_week TEXT',
            'points_month TEXT',
            'points_forum TEXT',
            'points_purchase TEXT',
            'points_other TEXT',
            'points_spent TEXT',
            'points_decayed TEXT',
            'tags JSON',
            'points_adjusted TEXT',
            'ip_history JSON',
        ],
    },

    // Galleries
    {
        name: 'gallery_albums',
        schema: [
            'album_id TEXT PRIMARY KEY',
            'preset_id TEXT',
            'type TEXT',
            'game_id TEXT',
            'title TEXT',
            'description TEXT',
            'image_id TEXT',
            'total_images TEXT',
            'ordering TEXT',
        ],
    },
    {
        name: 'gallery_images',
        schema: [
            'image_id TEXT PRIMARY KEY',
            'preset_id TEXT',
            'title TEXT',
            'description TEXT',
            'created TEXT',
            'user_id TEXT',
            'views TEXT',
            'album_id TEXT',
            'have_original TEXT',
            'ordering TEXT',
            'number_comments TEXT',
            'comment_cid TEXT',
            'url TEXT',
            'url_full TEXT',
            'url_original TEXT',
            'can_modify BOOLEAN',
        ],
    },
    {
        name: 'gallery_tags',
        schema: [
            'gallery_tagid TEXT PRIMARY KEY',
            'album_id TEXT',
            'preset_id TEXT',
            'image_id TEXT',
            'user_id TEXT',
            'note TEXT',
            'ordering TEXT',
            'px TEXT',
            'py TEXT',
            'width TEXT',
            'height TEXT',
            'taglist JSON',
        ],
    },

    // Files
    {
        name: 's3_files',
        schema: [
            'filename TEXT',
            'url TEXT',
            'dirPath TEXT',
        ]
    },
];