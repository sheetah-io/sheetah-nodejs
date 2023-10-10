const fetch = require("node-fetch");

const API_URL = "https://app.sheetah.io/api/export/xlsx/v1";

class Sheetah {
  constructor(API_KEY) {
    this.config = {
      API_KEY,
      templateId: null,
      tables: [],
      variables: {},
      sheets: [],
      options: {
        filename: null,
        password: null,
        expireInDays: null,
      },
    };
  }

  setTemplateId(templateId) {
    this.config.templateId = templateId;
    return this;
  }

  setTables(tables) {
    this.config.tables = tables;
    return this;
  }

  setVariables(variables) {
    this.config.variables = variables;
    return this;
  }

  setSheets(sheets) {
    this.config.sheets = sheets;
    return this;
  }

  setOptions(options) {
    this.config.options = options;
  }

  async exportExcelToFileUrl() {
    const { API_KEY, templateId, tables, variables, sheets, options } =
      this.config;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        templateId,
        tables,
        variables,
        sheets,
        options,
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      const { message, fileUrl } = data;
      return { message, fileUrl };
    } catch (error) {
      return { message: error.message, fileUrl: null };
    }
  }

  async exportExcelToBuffer() {
    const { message, staticFileUrl } = await this.exportExcelToFileUrl();

    if (staticFileUrl) {
      const response = await fetch(staticFileUrl);
      const buffer = await response.buffer();
      return { message, buffer };
    } else {
      return { message, buffer };
    }
  }

  async exportExcelToFile(filepath) {
    const { message, staticFileUrl } = await this.exportExcelToFileUrl();

    if (staticFileUrl) {
      const response = await fetch(staticFileUrl);
      const buffer = await response.buffer();
      fs.writeFileSync(filepath, buffer);
      return { message: "File downloaded successfully!", file: filepath };
    } else {
      return { message, file: null };
    }
  }
}

export default Sheetah;
