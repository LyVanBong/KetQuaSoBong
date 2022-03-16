namespace KetQuaSoBong.Helper
{
    public static class DateTimeHelper
    {
        public static string StandardWeekDays(string weekDay)
        {
            switch (weekDay)
            {
                case "Monday": return "THỨ HAI"; break;
                case "Tuesday": return "THỨ BA"; break;
                case "Wednesday": return "THỨ TƯ"; break;
                case "Thursday": return "THỨ NĂM"; break;
                case "Friday": return "THỨ SÁU"; break;
                case "Saturday": return "THỨ BẢY"; break;
                case "Sunday": return "CHỦ NHẬT"; break;
                default: return ""; break;
            }
        }

        public static string StandardDayMonths(double dayOrMonth) => dayOrMonth < 10 ? "0" + dayOrMonth : dayOrMonth.ToString();
    }
}