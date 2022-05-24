using KetQuaSoBong.Models;
using KetQuaSoBong.Services.NumberVoted;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;

namespace KetQuaSoBong.ViewModels.NumberVoted
{
    internal class NumberVotedVM : BindableBase
    {
        private int _count = 0;
        public string[] Numbers { get; set; }
        private bool _isVisibleResult = true;

        public bool IsVisibleResult
        {
            get => _isVisibleResult;
            set => SetProperty(ref _isVisibleResult, value);
        }

        private List<string> _numbersSelected = new List<string>();

        public List<string> NumbersSelected
        {
            get => _numbersSelected;
            set
            {
                SetProperty(ref _numbersSelected, value);
            }
        }

        public ObservableCollection<VoteItem> _resultVotes = new ObservableCollection<VoteItem>();

        public ObservableCollection<VoteItem> ResultVotes
        {
            get => _resultVotes;
            set
            {
                SetProperty(ref _resultVotes, value);
            }
        }

        private string _strNumbers = "";

        public string StrNumbers
        {
            get => _strNumbers;
            set => SetProperty(ref _strNumbers, value);
        }

        private VotedNumberService _votedNumberService;
        public NumberVotedVM(ContentView c, VotedNumberService votedNumberService)
        {
            _votedNumberService = votedNumberService;
            Setsource(c);

        }

        public void Setsource(ContentView view)
        {
            Numbers = new string[100];
            for (int i = 0; i < 100; i++)
            {
                Numbers[i] = i < 10 ? "0" + i : i.ToString();
            }
            SelectCommand = new Command((x) =>
            {
                var btn = x as Button;

                if (btn.ClassId == "0")
                {
                    if (_count < 2)
                    {
                        _count++;
                        btn.ClassId = "1";
                        NumbersSelected.Add(btn.Text);
                        StrNumbers = string.Join(",", NumbersSelected.ToArray());
                    }
                }
                else
                {
                    _count--;
                    btn.ClassId = "0";
                    NumbersSelected.Remove(btn.Text);
                    StrNumbers = string.Join(",", NumbersSelected.ToArray());
                }

            });
            ShowHideResultCommand = new Command(() =>
            {
                Vote(view);
            });
            GoBackCommand = new Command(() =>
            {
                IsVisibleResult = true;
            });
        }

        public async void Vote(ContentView view)
        {
            if (StrNumbers.Length > 0)
            {
                bool b = await _votedNumberService.VoteAsync(StrNumbers);
                if (b == true)
                {
                    IsVisibleResult = false;
                    SetListVoteAsync(NumbersSelected);
                }
                else
                {
                    await (view.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent as Page).DisplayAlert("Thông báo", "Mạng lỗi, bình chọn không thành công.", "Trở lại");
                }
            }
            else
            {
                await (view.Parent.Parent.Parent.Parent.Parent.Parent.Parent.Parent as Page).DisplayAlert("Thông báo", "Vui lòng chọn ít nhất 1 con số.", "Trở lại");
            }
        }

        public async void SetListVoteAsync(List<string> votes)
        {
            //GetAllVote
            List<VoteItem> voteList = new List<VoteItem>();
            ResultVotes = new ObservableCollection<VoteItem>();
            voteList = await _votedNumberService.GetVote();
            if (voteList.Count > 0)
            {
                foreach (VoteItem v in voteList)
                {
                    foreach (string str1 in votes)
                    {
                        if (v.Number.Equals(str1))
                        {
                            ResultVotes.Add(v);
                        }
                    }
                }
            }
        }

        public Command SelectCommand { get; set; }
        public Command ShowHideResultCommand { get; set; }
        public Command GoBackCommand { get; set; }
    }
}
