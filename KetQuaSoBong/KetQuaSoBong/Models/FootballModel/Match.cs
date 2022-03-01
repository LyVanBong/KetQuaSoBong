using KetQuaSoBong.Models.FootballModel;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.Models
{
    public class Match : BindableBase
    {
        //Team
        public Team Team1 { get; set; }
        public Team Team2 { get; set; }
        private int _status;
        public int Status { 
            get => _status; 
            set 
            {
                StatusLightSource = value == 0 ? ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_play.png") : (value == 1 ? ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_pause.png") : ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_stop.png"));
                SetProperty(ref _status, value);
            } 
        }
        public DateTime TimeStart { get; set; }
        private double _timePlaying;
        public double TimePlaying { get=> _timePlaying; set =>SetProperty(ref _timePlaying, value); }
        private double _timePlus;
        public double TimePlus { get => _timePlus; set => SetProperty(ref _timePlus, value); }
        private double _timeDelay;
        public double TimeDelay { get => _timeDelay; set => SetProperty(ref _timeDelay, value); }
        public string LeagueId { get; set; }
        //Math Detail
        private int _pointT1;
        public int PointT1
        {
            get => _pointT1;
            set => SetProperty(ref _pointT1, value);
        }

        public int _shootingT1;
        public int ShootingT1
        {
            get => _shootingT1;
            set => SetProperty(ref _shootingT1, value);
        }
        public int _attackT1;
        public int AttackT1
        {
            get => _attackT1;
            set => SetProperty(ref _attackT1, value);
        }
        public int _prossessionT1;
        public int ProssessionT1
        {
            get => _prossessionT1;
            set => SetProperty(ref _prossessionT1, value);
        }
        public int _cornerT1;
        public int CỏnnerT1
        {
            get => _cornerT1;
            set => SetProperty(ref _cornerT1, value);
        }
        public int _foldT1;
        public int FoldT1
        {
            get => _foldT1;
            set => SetProperty(ref _foldT1, value);
        }
        
        public int _yellowCardT1;
        public int YellowCardT1
        {
            get => _yellowCardT1;
            set => SetProperty(ref _yellowCardT1, value);
        }
        public int _redCardT1;
        public int RedCardT1
        {
            get => _redCardT1;
            set => SetProperty(ref _redCardT1, value);
        }

        private int _pointT2;
        public int PointT2
        {
            get => _pointT2;
            set => SetProperty(ref _pointT2, value);
        }

        public int _shootingT2;
        public int ShootingT2
        {
            get => _shootingT2;
            set => SetProperty(ref _shootingT2, value);
        }
        public int _attackT2;
        public int AttackT2
        {
            get => _attackT2;
            set => SetProperty(ref _attackT2, value);
        }
        public int _prossessionT2;
        public int ProssessionT2
        {
            get => _prossessionT2;
            set => SetProperty(ref _prossessionT2, value);
        }
        public int _cornerT2;
        public int CỏnnerT2
        {
            get => _cornerT2;
            set => SetProperty(ref _cornerT2, value);
        }
        public int _foldT2;
        public int FoldT2
        {
            get => _foldT2;
            set => SetProperty(ref _foldT2, value);
        }

        public int _yellowCardT2;
        public int YellowCardT2
        {
            get => _yellowCardT2;
            set => SetProperty(ref _yellowCardT2, value);
        }
        public int _redCardT2;
        public int RedCardT2
        {
            get => _redCardT2;
            set => SetProperty(ref _redCardT2, value);
        }
        public string NoteMatch { get; set; }

        private ImageSource _statusLightSource; 
        public ImageSource StatusLightSource
        {
            get => _statusLightSource;
            set => SetProperty(ref _statusLightSource, value);
        }

        public void SetTime()
        {   
        
            Device.StartTimer(TimeSpan.FromMinutes(1), () =>
            {   
                
                DateTime now = DateTime.Now;
                if(Status != 3)
                {
                    if(Status == 0)
                    {
                        TimeSpan span = now.Subtract(TimeStart);
                        
                        if (span.TotalMinutes <= 45)
                        {  
                            
                            TimePlaying += span.TotalMinutes;
                            
                        }
                        else 
                        {
                            TimeSpan span2 = now.Subtract(TimeStart.AddSeconds(2700));
                            TimePlus = span2.TotalMinutes;
                        }
                    }
                    else if(Status == 1)
                    {
                        TimeSpan span = now.Subtract(TimeStart.AddSeconds(2700).AddMinutes(TimePlus));
                        TimeDelay = span.TotalMinutes;
                    }    
                    return true;
                } 
                else
                {
                    return false;
                }
            });
        }
    }
}
