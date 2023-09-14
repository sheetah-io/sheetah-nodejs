# Sheetah - Excel Export Library

Sheetah is a Node.js library that simplifies the process of exporting Excel files using the [sheetah.io](https://sheetah.io/) service. With Sheetah, you can easily generate Excel files from your data and templates.

## Installation

You can install Sheetah via npm:

```shell
npm install sheetah
```

## Getting Started

To get started with Sheetah, you'll need to have your API key from [sheetah.io](https://sheetah.io/). You can then use the library to export Excel files with your data.

```javascript
const Sheetah = require("sheetah");

const API_KEY = "YOUR_API_KEY";
const sheetah = new Sheetah(API_KEY);
```

## Usage

Sheetah provides a simple and flexible API for exporting Excel files. Here's a step-by-step guide on how to use it:

### 1. Setting the Template ID

Use the `setTemplateId` method to specify the template ID for your Excel export:

```javascript
sheetah.setTemplateId(35);
```

### 2. Setting the Filename

Set the desired filename for the exported Excel file using the `setFilename` method:

```javascript
sheetah.setFilename("Styles and Formatting");
```

### 3. Adding Sheets

You can add sheets to your Excel file using the `setSheetInfo` method. Provide the sheet name and optional direct data for each sheet:

```javascript
sheetah.setSheetInfo({
  id: 1,
  name: "Sheet1",
  directData: {
    B2: "I am B2 on Sheet1",
  },
});

sheetah.setSheetInfo({
  id: 2,
  name: "Sheet2",
  directData: {
    A1: "This is A1 on Sheet2",
  },
});
```

You can skip this part if you don't want to change the sheet name or don't want to put direct data. "name" and "directData" are both optional fields.

### 4. Adding Data

To add data to your Excel file, use the `setData` method. You can specify different data areas by providing unique keys:

```javascript
sheetah.setData("sheet1-user-data", [
  // Name, Phone Number, Gender, Birth, Paid
  ["Daniel", "040-158-****", "Male", "1998.07.04", "Paid"],
  ["Carel", "070-130-****", "Female", "2003.09.24", "Non-Paid"],
]);

sheetah.setData("sheet2-revenue-analysis", [
  // Month, Revenue, Gross Profit, Net Profit
  ["2023.08", "$70,000", "$58,000", "$48,000"],
  ["2023.09", "$74,000", "$64,000", "$50,000"],
]);
```

**_Each data key should be defined in Sheetah dashboard._**

### 5. Performing the Export

To export your Excel file, use the `export` method:

```javascript
(async () => {
  const result = await sheetah
    // set templateId, fileName, sheetInfo, data, ...
    .export();
  if (result.message === "ok") {
    console.log("Download URL:", result.staticFileUrl);
  } else {
    console.log("Download Failed", result.message);
  }
})();
```

## Contributing

Contributions to Sheetah are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a branch for your feature or bug fix.
3. Make your changes and commit them.
4. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License

```
Make sure to replace `'YOUR_API_KEY'` with your actual API key when using the library, and update any additional information or details as needed.
```
