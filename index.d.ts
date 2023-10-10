declare module "sheetah" {
  /**
   * Information about a sheet.
   */
  interface SheetInfo {
    id: number;
    name: string;
    directData: Record<string, any>;
  }

  /**
   * Represents a table in the sheet.
   */
  interface Table {
    id: string;
    columns: Array<{
      name: string;
      /**
       * If set to true, the table will have automatic filter feature on the top of the header in Excel.
       */
      filter: boolean;
      /**
       * Type of total formula for the column.
       * - 'none': No totals function for this column
       * - 'average': Compute average for the column
       * - 'countNums': Count the entries that are numbers
       * - 'count': Count of entries
       * - 'max': The maximum value in this column (To show max value of the table)
       * - 'min': The minimum value in this column (To show min value of the table)
       * - 'stdDev': The standard deviation for this column
       * - 'var': The variance for this column
       * - 'sum': The sum of entries for this column
       */
      totalFormula:
        | "none"
        | "average"
        | "countNums"
        | "count"
        | "max"
        | "min"
        | "stdDev"
        | "var"
        | "sum";
    }>;
    rows: Array<Array<any>>;
  }

  /**
   * Represents optional details for the exported file.
   */
  interface Options {
    filename: string | null;
    password: string | null;
    expireInDays: number | null;
  }

  /**
   * Main class representing the Sheetah library.
   */
  export default class Sheetah {
    /**
     * Creates an instance of Sheetah with the provided API key.
     * @param API_KEY The API key for authentication.
     * @example
     * const API_KEY = "your_api_key_here";
     * const sheetah = new Sheetah(API_KEY);
     */
    constructor(API_KEY: string);

    /**
     * Sets the template ID for the sheet.
     * @param templateId The ID of the template.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setTemplateId(57);
     */
    setTemplateId(templateId: number): Sheetah;

    /**
     * Sets the tables for the sheet.
     * @param tables An array of tables to be added to the sheet.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setTables([
     *     {
     *       "id": "UserTable",
     *       "columns": [
     *         {"name": "UserName", "filter": false, "totalFormula": "none"},
     *         {"name": "Age", "filter": false, "totalFormula": "average"},
     *         {"name": "Paid Status", "filter": true, "totalFormula": "none"},
     *         {"name": "Paid Amount", "filter": true, "totalFormula": "sum"}
     *       ],
     *       "rows": [["John", 30, "paid", 1500], ["Sarah", 28, "unpaid", 2500]]
     *     }
     *   ]);
     */
    setTables(tables: Table[]): Sheetah;

    /**
     * Sets variables for the sheet.
     * @param variables A dictionary of variables to be set.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setVariables({
     *     "user": "Dave",
     *     "email": "admin@example.com",
     *     "year": "2019",
     *     "month": "08"
     *   });
     */
    setVariables(variables: { [key: string]: string }): Sheetah;

    /**
     * Sets information about the sheet.
     * @param sheets Information about the sheets.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setSheets([
     *     {
     *       "id": 1,
     *       "name": "Custom Sheet Name 1",
     *       "directData": {"C3": "I'm C3"}
     *     }
     *   ]);
     */
    setSheets(sheets: SheetInfo[]): Sheetah;

    /**
     * Sets options for the sheet.
     * @param options A dictionary of options to be set.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setOptions({
     *     "filename": "revenue-2023-08",
     *     "password": "123456",
     *     "expireInDays": 7
     *   });
     */
    setOptions(options: Options): Sheetah;

    /**
     * Exports the sheet and returns a promise with the result.
     * @returns A promise with the export result, including a message and a static file URL.
     * The message field can be either 'success' or an error message.
     * The fileUrl field can be used by the user to access the exported sheet.
     * @example
     * sheetah
     *   //...
     *   .exportExcelToFileUrl()
     *   .then(result => {
     *     console.log(result.message);
     *     if (result.fileUrl) {
     *       console.log("Access your sheet here:", result.fileUrl);
     *     }
     *   });
     */
    exportExcelToFileUrl(): Promise<{
      message?: string;
      fileUrl: string | null;
    }>;

    /**
     * Exports the sheet and returns it as a byte array.
     * @returns A promise with the byte array of the exported sheet.
     * @example
     * sheetah
     *   // ...
     *   .exportExcelToBuffer()
     *   .then(result => {
     *     // use result.buffer
     *   });
     */
    exportExcelToBuffer(): Promise<{
      message?: string;
      buffer: Buffer | null;
    }>;

    /**
     * Exports the sheet and saves it to a local file.
     * @param filepath The path for the file to be saved at.
     * @returns A promise with a message and filepath.
     * The message indicates if the file was downloaded successfully. The filepath is the path of the downloaded file.
     * @example
     * sheetah
     *   // ...
     *   .exportExcelToFile('/path/to/file.xlsx')
     *   .then(result => {
     *     console.log(result.message);
     *     console.log("Downloaded file =", result.file);
     *   });
     */
    exportExcelToFile(
      filepath: string
    ): Promise<{ message?: string; file: string | null }>;
  }
}
