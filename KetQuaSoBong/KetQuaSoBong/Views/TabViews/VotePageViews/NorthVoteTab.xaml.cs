using KetQuaSoBong.Models;
using KetQuaSoBong.Services.NumberVoted;
using KetQuaSoBong.ViewModels.NumberVoted;
using Newtonsoft.Json;
using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Net.Http;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace KetQuaSoBong.Views.VotePageViews
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NorthVoteTab : ContentView
    {
        VotedNumberService votedNumberService = new VotedNumberService();
        public NorthVoteTab()
        {
            InitializeComponent();
            BindingContext = new NumberVotedVM(this, votedNumberService);
        }
    }

   
}