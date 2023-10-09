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
     * Sets the filename for the sheet.
     * @param filename The desired filename for the sheet.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setFilename("revenue-2023-08");
     */
    setFilename(filename: string): Sheetah;

    /**
     * Sets information about the sheet.
     * @param sheetInfo Information about the sheet.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setSheetInfo({
     *     "id": 1,
     *     "name": "Custom Sheet Name 1",
     *     "directData": {"C3": "I'm C3"}
     *   });
     */
    setSheetInfo(sheetInfo: SheetInfo): Sheetah;

    /**
     * Sets the password for the sheet.
     * @param password The password for the sheet.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setPassword("123456");
     */
    setPassword(password: string): Sheetah;

    /**
     * Sets the expiration duration for the sheet.
     * @param expireInDays The expiration duration in days.
     * @returns The Sheetah instance for method chaining.
     * @example
     * sheetah
     *   // ...
     *   .setExpireInDays(7);
     */
    setExpireInDays(expireInDays: number): Sheetah;

    /**
     * Exports the sheet and returns a promise with the result.
     * @returns A promise with the export result, including a message and a static file URL.
     * The message field can be either 'success' or an error message.
     * The staticFileUrl field can be used by the user to access the exported sheet.
     * @example
     * sheetah
     *   //...
     *   .exportExcel()
     *   .then(result => {
     *     console.log(result.message);
     *     if (result.staticFileUrl) {
     *       console.log("Access your sheet here:", result.staticFileUrl);
     *     }
     *   });
     */
    exportExcel(): Promise<{ message: string; staticFileUrl: string | null }>;
  }
}
