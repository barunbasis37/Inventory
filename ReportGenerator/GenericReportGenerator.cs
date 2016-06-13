using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;

namespace ReportGenerator
{
    public static class GenericReportGenerator<T> where T:class 
    {
        private static List<Dictionary<string, string>> GetDatas(List<T> list)
        {
            List<Dictionary<string, string>> listOfDict = new List<Dictionary<string, string>>();
            if (list.Count > 0)
            {
                PropertyInfo[] propertyInfos = list[0].GetType().GetProperties();
                foreach (var data in list)
                {
                    Dictionary<string, string> dictionary = new Dictionary<string, string>();
                    foreach (var p in propertyInfos)
                    {
                        object value = p.GetGetMethod().Invoke(data, null);
                        dictionary.Add(p.Name, value?.ToString() ?? "");
                    }

                    listOfDict.Add(dictionary);
                }
            }
            return listOfDict;
        }



        public static void WriteExcel(List<T> list, string headerValue, string filename)
        {
            var datas = GetDatas(list);
            var columns = GetColumns(list[0]);
            HSSFWorkbook workbook = Get(datas, headerValue, columns);
            var op = new FileStream(filename, FileMode.OpenOrCreate);
            workbook.Write(op);
            op.Close();
        }

        private static List<string> GetColumns(T p)
        {
            PropertyInfo[] propertyInfos = p.GetType().GetProperties();
            return propertyInfos.Select(x => x.Name).ToList();
        }

        private static HSSFWorkbook Get(List<Dictionary<string, string>> datas, string headerValue, List<string> columnList)
        {
     
            var workbook = new HSSFWorkbook();
            var sheet = workbook.CreateSheet();

            for (int index = 0; index < columnList.Count; index++)
            {
                sheet.SetColumnWidth(index, 15 * 256);
            }


            IRow headerRow = sheet.CreateRow(0);
            ICell cell = headerRow.CreateCell(0);
            
            cell.SetCellValue(headerValue);
            cell.CellStyle.WrapText = true;
            cell.Row.Height = 612; //1.5 inch / 2 pix
            cell.CellStyle.Alignment = HorizontalAlignment.Center;
            cell.CellStyle.VerticalAlignment = VerticalAlignment.Center;
            CellRangeAddress address = new CellRangeAddress(0, 0, 0, columnList.Count-1);
            sheet.AddMergedRegion(address);

            var tableHeaderRow = sheet.CreateRow(1);
            for (int index = 0; index < columnList.Count; index++)
            {
                var c = columnList[index];
                tableHeaderRow.CreateCell(index).SetCellValue(c);
            }

            sheet.CreateFreezePane(0, 2, 0, 2);

            int rowNumber = 2;

            foreach (var data in datas)
            {
                var row = sheet.CreateRow(rowNumber++);              
                for (int keyIndex = 0; keyIndex < data.Keys.ToList().Count; keyIndex++)
                {
                    string key = data.Keys.ToList()[keyIndex];
                    row.CreateCell(keyIndex).SetCellValue(data[key]);
                }
            }
           
            return workbook;

        }
    }
}
