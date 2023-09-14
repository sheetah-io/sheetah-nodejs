const axios = require("axios");
const API_URL = "https://sheetah.io/api/export/xlsx/v1";

class Sheetah {
  constructor(API_KEY) {
    this.config = {
      API_KEY,
      templateId: null,
      filename: null,
      sheets: [],
      dataAreas: {},
    };
  }

  setTemplateId(templateId) {
    this.config.templateId = templateId;
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

  setData(key, data) {
    this.config.dataAreas[key] = data;
    return this;
  }

  async export() {
    const { API_KEY, templateId, filename, sheets, dataAreas } = this.config;

    try {
      const response = await axios.post(API_URL, {
        API_KEY,
        templateId,
        filename,
        sheets,
        dataAreas,
      });

      const { message, staticFileUrl } = response.data;
      return { message, staticFileUrl };
    } catch (error) {
      throw { message: error.message, staticFileUrl: null };
    }
  }
}

module.exports = Sheetah;
