let values = [];

function onEditTrigger(e: GoogleAppsScript.Events.SheetsOnEdit): void {
  const notation = e.range.getA1Notation();

  if (notation === "A1") {
    let res = updateSheet();
    if (/^\w+$/.test(e.value)) {
      this.eval(e.value)();
      e.range.clear();
      e.range.setFontColor(res ? SUCCESS_COLOR : ERROR_COLOR);
    }
  }
}

function updateSheet(): boolean {
  const root = getDataFromLink(UNITY_BLOG_URL);

  if (!root)
    return false;

  const searchElement = html_utils.getElementsByTagName(root, SEARCH_ELEMENT_KEYWORD);
  const posts: string = findElementWithKeyword(searchElement, REQUIRED_ELEMENT_KEYWORD);
  const newsBodies = getNewsBodies(posts);

  if (newsBodies) {
    initValuesArr(newsBodies);
  }

  // Put the values to Spreadsheet.
  if (values) {
    insertValues();
    applyStyle(values.length, values[0].length);
  }

  return true;
}

function findElementWithKeyword(elements: any[], keyword: string): string {
  for (let e in elements) {
    if (elements[e].getValue().includes(keyword)) {
      return elements[e].getValue();
    }
  }
}

function getDataFromLink(url: string): GoogleAppsScript.XML_Service.Element {
  let res = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true
  });
  if (res.getResponseCode() == 200)
    return XmlService.parse(res.getContentText()).getRootElement();
  return null;
}

function getNewsBodies(source: string): string[] {
  let newsBodies = [];

  if (source) {
    let startIndexArr = [...utils.indexOfSubstrings(source, START_OF_BODY_KEYWORD)];
    for (let i = 0; i < startIndexArr.length - 1; ++i) {
      newsBodies[i] = source.substring(startIndexArr[i], startIndexArr[i + 1]);
    }
    newsBodies[startIndexArr.length - 1] = source.substring(startIndexArr[startIndexArr.length - 1]);
  }

  return newsBodies;
}

function initValuesArr(newsBodies: string[]) {
  values[0] = [];
  values[0][ECategory.TITLE] = TITLE_NAME;
  values[0][ECategory.DESCRIPTION] = DESCRIPTION_NAME;
  values[0][ECategory.LINK] = LINK_NAME;
  values[0][ECategory.GUID] = GUID_NAME;
  values[0][ECategory.CATEGORY] = CATEGORY_NAME;
  values[0][ECategory.NAME] = NAME_NAME;
  values[0][ECategory.DATE] = DATE_NAME;

  for (let i = 1; i <= newsBodies.length; ++i) {
    const source = newsBodies[i - 1];
    const guid = utils.getInfoByTag(source, GUID_KEYWORD); // GUID
    let exists = false;

    for (let r in values) {
      for (let c in values[r]) {
        if (values[r][c] == guid) {
          exists = true;
          break;
        }
      }
    }

    if (exists) continue;

    values[i] = [];
    values[i][0] = utils.getInfoByTag(source, TITLE_KEYWORD); // Title
    values[i][1] = utils.getInfoByTag(source, DESCRIPTION_KEYWORD); // Description
    values[i][2] = UNITY_URL + utils.getInfoByTag(source, LINK_KEYWORD); // Link
    values[i][3] = guid; // GUID

    const dataLink = getDataFromLink(values[i][ECategory.LINK]);
    const xmlElement = html_utils.getElementsByClassName(dataLink, XML_BLOCK_KEYWORD)[0];
    const category = html_utils.getElementsByClassName(xmlElement, CATEGORY_KEYWORD)[0];
    const nameElement = html_utils.getElementsByClassName(xmlElement, NAME_KEYWORD)[0];
    const nameValue = nameElement.asElement().getValue();

    values[i][4] = category.asElement().getValue(); // Category
    values[i][5] = nameValue.substring(0, nameValue.indexOf(NAME_ENDING_KEYWORD)); // Name
    values[i][6] = utils.getInfoByTag(source, DATE_KEYWORD); // Date
  }
}

function insertValues(): void {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sheet
    .clear()
    .getRange(1, 2, values.length, values[0].length)
    .setValues(values);
}

function applyStyle(rows: number, columns: number): void {
  const spreadsheet = SpreadsheetApp.getActive();

  const titleLetter = utils.columnToLetter(ECategory.TITLE + COLUMN_POSITION);
  const dateLetter = utils.columnToLetter(ECategory.DATE + COLUMN_POSITION);
  spreadsheet.getRange(`${titleLetter}1:${utils.columnToLetter(columns + 1)}1`).setFontWeight("bold");
  spreadsheet.getRange(`${utils.columnToLetter(ECategory.GUID + COLUMN_POSITION)}:${dateLetter}`).setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  spreadsheet.getRange(`${titleLetter}1:${dateLetter}1`).setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  spreadsheet.getRange(`${titleLetter}:${utils.columnToLetter(ECategory.LINK + COLUMN_POSITION)}`).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
    .setVerticalAlignment('middle');

  spreadsheet.getActiveSheet().setRowHeight(1, FIRST_ROW_HEIGHT);
  spreadsheet.getActiveSheet().setRowHeights(2, columns, ROWS_HEIGHT);
  spreadsheet.getActiveSheet().setColumnWidth(ECategory.TITLE + COLUMN_POSITION, TITLE_WIDTH);
  spreadsheet.getActiveSheet().setColumnWidth(ECategory.DESCRIPTION + COLUMN_POSITION, DESCRIPTION_WIDTH);
  spreadsheet.getActiveSheet().setColumnWidth(ECategory.LINK + COLUMN_POSITION, LINK_WIDTH);
  spreadsheet.getActiveSheet().autoResizeColumns(ECategory.GUID + COLUMN_POSITION, ECategory.DATE + COLUMN_POSITION);

  for (let i = 1; i <= rows; ++i) {
    const range = spreadsheet.getRange(`${utils.columnToLetter(1)}${i}:${utils.columnToLetter(columns + 1)}${i}`);
    if (i % 2 == 0)
      range.setBackground(LIGHT_COLOR);
    else
      range.setBackground(DARK_COLOR);
  }
}
