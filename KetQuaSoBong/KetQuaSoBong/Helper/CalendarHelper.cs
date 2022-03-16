using KetQuaSoBong.Models;
using System;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace KetQuaSoBong.Helper
{
    public class CalendarHelper
    {
        public ObservableCollection<ItemCalendar> InitCalendar(int days, int month, int year)
        {
            ObservableCollection<ItemCalendar> Calendar = new ObservableCollection<ItemCalendar>();
            int startDay = StandarDayOfWeek(new DateTime(year, month, 1).DayOfWeek.ToString());
            int numberDay = DateTime.DaysInMonth(year, month);
            int[] arr = new int[42];
            int day = 0;
            for (int i = startDay; i < startDay + numberDay; i++)
            {
                day++;
                arr[i] = day;
            }
            month = month - 1 == 0 ? 12 : month;
            int dayOfMonth2 = DateTime.DaysInMonth(year, month - 1);
            for (int j = startDay - 1; j >= 0; j--)
            {
                arr[j] = dayOfMonth2;
                dayOfMonth2--;
            }
            int dem = 1;
            for (int k = startDay + numberDay; k < 42; k++)
            {
                arr[k] = dem;
                dem++;
            }
            for (int i = 0; i < arr.Length; i++)
            {
                ItemCalendar item;
                if (i < startDay || i >= startDay + numberDay)
                {
                    item = new ItemCalendar() { Number = arr[i], NumberColor = Color.LightGray, IsEnable = false };
                }
                else
                {
                    item = new ItemCalendar() { Number = arr[i], NumberColor = Color.Black, IsEnable = true };

                    if (item.Number == days)
                    {
                        item.IsChecked = true;
                    }
                }
                Calendar.Add(item);
            }
            return Calendar;
        }

        public int StandarDayOfWeek(string day)
        {
            switch (day)
            {
                case "Monday": return 0; break;
                case "Tuesday": return 1; break;
                case "Wednesday": return 2; break;
                case "Thursday": return 3; break;
                case "Friday": return 4; break;
                case "Saturday": return 5; break;
                case "Sunday": return 6; break;
                default: return 100; break;
            }
        }
    }
}