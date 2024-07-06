enum ECategory {
    TITLE,
    DESCRIPTION,
    LINK,
    GUID,
    CATEGORY,
    NAME,
    DATE,
}

// Header names
const TITLE_NAME: string = "Title";
const DESCRIPTION_NAME: string = "Description";
const LINK_NAME: string = "Link";
const GUID_NAME: string = "GUID";
const CATEGORY_NAME: string = "Category";
const NAME_NAME: string = "Name";
const DATE_NAME: string = "Date";

const SHEET_NAME: string = "Sheet1"
const UNITY_URL: string = "https://unity.com"
const UNITY_BLOG_URL: string = `${UNITY_URL}/blog`;
const SEARCH_ELEMENT_KEYWORD: string = "script"
const REQUIRED_ELEMENT_KEYWORD: string = "Latest posts";
const START_OF_BODY_KEYWORD: string = "_id";

// String Keywords
const TITLE_KEYWORD: string = `title\\":\\"`;
const DESCRIPTION_KEYWORD: string = `description\\":\\"`;
const LINK_KEYWORD: string = `href\\":{\\"current\\":\\"`
const GUID_KEYWORD: string = `_id\\":\\"`
const XML_BLOCK_KEYWORD: string = "pb-6 pt-8 md:pt-32";
const DATE_KEYWORD: string = `date\\":\\"`;
const NAME_ENDING_KEYWORD: string = " /";

// HTML Classes
const CATEGORY_KEYWORD: string = "loco-caption-sm-semibold pb-6";
const NAME_KEYWORD: string = "text-gray-900 dark:text-gray-100 pb-1 loco-caption-lg-semibold";

// Style
const COLUMN_POSITION: number = 2;

const LIGHT_COLOR = "#d9d9d9";
const DARK_COLOR = "#b7b7b7";
const ERROR_COLOR = "#ff0000";
const SUCCESS_COLOR = "#00ff00";
const BLACK_COLOR = "#000000";

const FIRST_ROW_HEIGHT: number = 50;
const ROWS_HEIGHT: number = 100;
const TITLE_WIDTH: number = 160;
const DESCRIPTION_WIDTH: number = 400;
const LINK_WIDTH: number = 300;
