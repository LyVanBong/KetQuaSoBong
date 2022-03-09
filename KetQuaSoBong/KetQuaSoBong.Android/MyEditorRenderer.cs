using Android.Content;
using KetQuaSoBong.Views.CustomViews;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using XFTest.Droid.Renderers;

[assembly: ExportRenderer(typeof(CustomEditor), typeof(MyEditorRenderer))]

namespace XFTest.Droid.Renderers
{
    public class MyEditorRenderer : EditorRenderer
    {
        public MyEditorRenderer(Context context) : base(context) { }

        protected override void OnElementChanged(ElementChangedEventArgs<Editor> e)
        {
            base.OnElementChanged(e);

            if (Control != null)
            {
                Control.Background = null;
                Control.SetBackgroundColor(Android.Graphics.Color.Transparent);
            }
        }
    }
}