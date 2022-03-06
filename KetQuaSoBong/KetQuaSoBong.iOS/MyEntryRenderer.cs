
using CustomRenderer.iOS;
using KetQuaSoBong.Views.CustomViews;
using SolrNet.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UIKit;
using Xamarin.Forms;
using Xamarin.Forms.Platform.iOS;

[assembly: ExportRenderer(typeof(CustomEntry), typeof(MyEntryRenderer))]
namespace CustomRenderer.iOS
{
    public class MyEntryRenderer : EntryRenderer
    {
        protected override void OnElementChanged(ElementChangedEventArgs<Entry> e)
    {
        base.OnElementChanged(e);

        if (Control != null)
        {
            // do whatever you want to the UITextField here!
            Control.BackgroundColor = UIColor.FromRGBA(0,0,0,0);
            Control.BorderStyle = UITextBorderStyle.Line;
        }
    }
}
}