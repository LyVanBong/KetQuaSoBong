using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

namespace KetQuaSoBong.Models.LotteryModel
{
    public class LotteryCollectionResult
    {
        public DateTime DateTimeResult { get; set; } 
        public int RegionResult { get; set; }
        public ObservableCollection<LotteryResult> LotteryResults => new ObservableCollection<LotteryResult>(App.LotteryResults.Where(x => x.DateResult == DateTimeResult && x.Region == RegionResult));
    }
}
