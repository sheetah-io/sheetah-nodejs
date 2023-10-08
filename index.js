const API_URL = "https://sheetah.io/api/export/xlsx/v1";

class Sheetah {
  constructor(API_KEY) {
    this.config = {
      API_KEY,
      templateId: null,
      tables: [],
      variables: {},
      filename: null,
      sheets: [],
      password: null,
      expireInDays: null,
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

  setFilename(filename) {
    this.config.filename = filename;
    return this;
  }

  setSheetInfo({ id, name, directData }) {
    this.config.sheets.push({
      id,
      name,
      directData: directData || {},
    });
    return this;
  }

  setPassword(password) {
    this.config.password = password;
    return this;
  }

  setExpireInDays(expireInDays) {
    this.config.expireInDays = expireInDays;
    return this;
  }

  async exportExcel() {
    const {
      API_KEY,
      templateId,
      tables,
      variables,
      filename,
      sheets,
      password,
      expireInDays,
    } = this.config;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        API_KEY,
        templateId,
        tables,
        variables,
        optional: {
          filename,
          sheets,
          password,
          expireInDays,
        },
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      const { message, staticFileUrl } = data;
      return { message, staticFileUrl };
    } catch (error) {
      throw { message: error.message, staticFileUrl: null };
    }
  }
}

export default Sheetah;
