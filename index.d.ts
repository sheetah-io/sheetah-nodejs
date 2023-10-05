declare module "sheetah" {
  interface SheetInfo {
    id: number;
    name: string;
    directData: Record<string, any>;
  }

  interface Table {
    id: string;
    columns: Array<{ name: string; filter: boolean; totalFormula: string }>;
    rows: Array<Array<any>>;
  }

  export default class Sheetah {
    constructor(API_KEY: string);

    setTemplateId(templateId: number): Sheetah;

    setTables(tables: Table[]): Sheetah;

    setFilename(filename: string): Sheetah;

    setSheetInfo(sheetInfo: SheetInfo): Sheetah;

    setPassword(password: string): Sheetah;

    setExpireInDays(expireInDays: number): Sheetah;

    export(): Promise<{ message: string; staticFileUrl: string | null }>;
  }
}
