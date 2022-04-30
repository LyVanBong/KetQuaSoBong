using KetQuaSoBong.Models;
using KetQuaSoBong.Models.LotteryModel;
using KetQuaSoBong.ViewModels;
using KetQuaSoBong.Views;
using KetQuaSoBong.Views.MainPageViews;
using KetQuaSoBong.Views.TabViews;
using Prism;
using Prism.Ioc;
using System;
using System.Collections.ObjectModel;
using Xamarin.Essentials;
using Xamarin.Essentials.Implementation;
using Xamarin.Essentials.Interfaces;
using Xamarin.Forms;

[assembly: ExportFont("Roboto-Black.ttf", Alias = "RB")]
[assembly: ExportFont("Roboto-BlackItalic.ttf", Alias = "RBI")]
[assembly: ExportFont("Roboto-Bold.ttf", Alias = "RBo")]
[assembly: ExportFont("Roboto-BoldItalic.ttf", Alias = "RBoI")]
[assembly: ExportFont("Roboto-Italic.ttf", Alias = "RI")]
[assembly: ExportFont("Roboto-Light.ttf", Alias = "RL")]
[assembly: ExportFont("Roboto-LightItalic.ttf", Alias = "RLI")]
[assembly: ExportFont("Roboto-Medium.ttf", Alias = "RM")]
[assembly: ExportFont("Roboto-MediumItalic.ttf", Alias = "RMI")]
[assembly: ExportFont("Roboto-Regular.ttf", Alias = "R")]
[assembly: ExportFont("Roboto-Thin.ttf", Alias = "RT")]
[assembly: ExportFont("Roboto-ThinItalic.ttf", Alias = "RTI")]

namespace KetQuaSoBong
{
    public partial class App
    {
        public static string ApiUrl = "https://tructiepketqua.net/api/";

        public static string[] NorthLotteryResultTest
        {
            get => new string[] { "98819", "44179", "96294", "96108", "61368", "22973", "51191", "28270", "11119", "11461", "6484", "4112", "0063", "8515", "4555", "2238", "0157", "5358", "6076", "8185", "957", "130", "489", "17", "45", "96", "10" };
        }

        public static ObservableCollection<Match> MatchePlayings = new ObservableCollection<Match>()
        {
            new Match()
            {
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Manchester United",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/330px-Man_Utd_FC_.svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Liverpool",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/0/0c/Liverpool_FC.svg/263px-Liverpool_FC.svg.png"))
               },
               Status = 0,
               TimePlaying = 49,
               PointT1 = 3,
               PointT2 = 1,
               NoteMatch = "Vòng 40, Premier League"
            },
            new Match()
            {
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Barcenola",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/9/91/FC_Barcelona_logo.svg/270px-FC_Barcelona_logo.svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Atlético Madrid",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/f/f4/Atletico_Madrid_2017_logo.svg/225px-Atletico_Madrid_2017_logo.svg.png"))
               },
               Status = 1,
               TimePlaying = 45,
               TimePlus = 2,
               PointT1 = 2,
               PointT2 = 2,
               NoteMatch = "Vòng 35, La Liga"
            }
            ,
            new Match()
            {
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Paris Saint-Germain",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/a/a7/Paris_Saint-Germain_F.C..svg/400px-Paris_Saint-Germain_F.C..svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Olympique Lyonnais",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/9/93/Olympique_Lyonnais.png"))
               },
               Status = 0,
               TimePlaying = 53,
               PointT1 = 3,
               PointT2 = 1,
               NoteMatch = "Vòng 22, League 1"
            },
            new Match()
            {
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Wolfsburg",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/thumbs/584d8596367b6a13e54477c2.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Bayern München",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/images/584d8683367b6a13e54477d4.png"))
               },
               Status = 0,
               TimePlaying = 85,
               PointT1 = 0,
               PointT2 = 1,
               NoteMatch = "Vòng 42, Bunesliga"
            }
        };

        public static ObservableCollection<Match> LeagueScores = new ObservableCollection<Match>()
        {
            new Match()
            {
               LeagueId = "premier",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Manchester United",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/330px-Man_Utd_FC_.svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Liverpool",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/0/0c/Liverpool_FC.svg/263px-Liverpool_FC.svg.png"))
               },
               Status = 1,
               TimePlaying = 49,
               PointT1 = 3,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
            new Match()
            {
               LeagueId = "premier",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Manchester United",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/330px-Man_Utd_FC_.svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Liverpool",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/0/0c/Liverpool_FC.svg/263px-Liverpool_FC.svg.png"))
               },
               Status = 1,
               TimePlaying = 90,
               PointT1 = 3,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
            new Match()
            {
               LeagueId = "premier",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Manchester United",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/330px-Man_Utd_FC_.svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Liverpool",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/0/0c/Liverpool_FC.svg/263px-Liverpool_FC.svg.png"))
               },
               Status = 1,
               TimePlaying = 90,
               PointT1 = 3,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
            new Match()
            {
                LeagueId = "laliga",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Barcenola",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/9/91/FC_Barcelona_logo.svg/270px-FC_Barcelona_logo.svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Atlético Madrid",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/f/f4/Atletico_Madrid_2017_logo.svg/225px-Atletico_Madrid_2017_logo.svg.png"))
               },
               Status = 1,
               TimePlaying = 45,
               TimePlus = 2,
               PointT1 = 2,
               PointT2 = 2,
               NoteMatch = "Hết giờ"
            }
            ,
            new Match()
            {
                LeagueId = "laliga",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Barcenola",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/9/91/FC_Barcelona_logo.svg/270px-FC_Barcelona_logo.svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Atlético Madrid",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/f/f4/Atletico_Madrid_2017_logo.svg/225px-Atletico_Madrid_2017_logo.svg.png"))
               },
               Status = 1,
               TimePlaying = 45,
               TimePlus = 2,
               PointT1 = 2,
               PointT2 = 2,
               NoteMatch = "Hết giờ"
            }
            ,
            new Match()
            {
               LeagueId = "league1",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Paris Saint-Germain",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/a/a7/Paris_Saint-Germain_F.C..svg/400px-Paris_Saint-Germain_F.C..svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Olympique Lyonnais",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/9/93/Olympique_Lyonnais.png"))
               },
               Status = 1,
               TimePlaying = 53,
               PointT1 = 3,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
            new Match()
            {
               LeagueId = "league1",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Paris Saint-Germain",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/thumb/a/a7/Paris_Saint-Germain_F.C..svg/400px-Paris_Saint-Germain_F.C..svg.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Olympique Lyonnais",
                   Logo = ImageSource.FromUri(new System.Uri("https://upload.wikimedia.org/wikipedia/vi/9/93/Olympique_Lyonnais.png"))
               },
               Status = 1,
               TimePlaying = 53,
               PointT1 = 3,
               PointT2 = 1,
               NoteMatch ="Hết giờ"
            },
            new Match()
            {
                LeagueId = "bunesliga",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Wolfsburg",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/thumbs/584d8596367b6a13e54477c2.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Bayern München",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/images/584d8683367b6a13e54477d4.png"))
               },
               Status = 1,
               TimePlaying = 85,
               PointT1 = 0,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
             new Match()
            {
                LeagueId = "bunesliga",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Wolfsburg",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/thumbs/584d8596367b6a13e54477c2.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Bayern München",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/images/584d8683367b6a13e54477d4.png"))
               },
               Status = 1,
               TimePlaying = 85,
               PointT1 = 0,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
              new Match()
            {
                LeagueId = "bunesliga",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Wolfsburg",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/thumbs/584d8596367b6a13e54477c2.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Bayern München",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/images/584d8683367b6a13e54477d4.png"))
               },
               Status = 1,
               TimePlaying = 85,
               PointT1 = 0,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
               new Match()
            {
                LeagueId = "serieA",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Wolfsburg",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/thumbs/584d8596367b6a13e54477c2.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Bayern München",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/images/584d8683367b6a13e54477d4.png"))
               },
               Status = 1,
               TimePlaying = 85,
               PointT1 = 0,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            },
               new Match()
            {
                LeagueId = "serieA",
               Team1 = new Models.FootballModel.Team()
               {
                   Name = "Wolfsburg",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/thumbs/584d8596367b6a13e54477c2.png"))
               },
               Team2 = new Models.FootballModel.Team()
               {
                   Name = "Bayern München",
                   Logo = ImageSource.FromUri(new System.Uri("http://assets.stickpng.com/images/584d8683367b6a13e54477d4.png"))
               },
               Status = 1,
               TimePlaying = 85,
               PointT1 = 0,
               PointT2 = 1,
               NoteMatch = "Hết giờ"
            }
        };

        public static ObservableCollection<NewsItem> FootballNews = new ObservableCollection<NewsItem>()
        {
             new NewsItem() {
                TitleSource = ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_fire.png"),
                Title = "Tin mới nhất",
                TypeTemplate = 3
            },
             new NewsItem()
            {
                Picture = "https://photo-baomoi.zadn.vn/w300_r3x2/2022_03_01_23_41897539/e50671e7e6a50ffb56b4.jpg",
                Title = "Quế Ngọc Hải ghi siêu phẩm, Tiến Linh 'khai hỏa' (H1)",
                SubTitle = "Trực tiếp bóng đá SLNA vs Topenland Bình Định, Đông Á Thanh Hóa vs Becamex Bình Dương - Không lâu Tiến Linh khai hỏa trên sân Thanh Hóa, Quế Ngọc Hải sút phạt thần sầu mở tỷ số cho SLNA tại Vinh.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="SLNA: Văn Hoàng, Đình Hoàng, Ngọc Hải, Văn Khánh, Bá Sang, Xuân Mạnh, Phúc Tịnh, Văn Đức, Mark Nkongho, Olaha, Phúc Tịnh, Abdul Basit."+
                "Bình Định: Tuyên Quang, Tiến Duy, Tấn Tài, Hữu Quý, Thanh Thịnh, Rafaelson, Hendrio, Đức Chinh, Schmidt, Văn Thành, Văn Trâm."+
                "Ghi bàn: Quế Ngọc Hải (11')"+
                "Đội hình xuất phát Thanh Hóa vs Bình Dương"+
                "Thanh Hoá: Bửu Ngọc, Xuân Cường, Tiến Dũng, Minh Tùng, Jose Pinto, Văn Thắng, Thành long, Văn Lợi, Tiến Thành, Ngọc Tân, Paulo Silva."+
                "B.Bình Dương: Tuấn Vũ, Thiện Đức, Nidiaye Olivier, Thanh Long, Eydison, Vĩ Hào, Tiến Linh, Trung Tín, Minh Khoa, Tuấn Vũ, Dawda."+
                "Ghi bàn: Tiến Linh (11')",
                TypeTemplate = 1
            },
             new NewsItem()
            {
                Picture = "https://photo-baomoi.zadn.vn/w300_r3x2_sm/2022_03_01_23_41898199/9cad3353a4114d4f1400.jpg",
                Title = "MU trả lương cao lôi kéo Ousmane Dembele",
                SubTitle = "Mê mẩn trước màn trình diễn của Ousmane Dembele, MU đang tìm cách lôi kéo cầu thủ người Pháp về sân Old Trafford.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="Ousmane Dembele khiến châu Âu chú ý với những màn trình diễn ấn tượng trong màu áo Barcelona thời gian gần đây."+
                 "Trong hai trận gần nhất, Ousmane Dembele ghi 1 bàn và thực hiện 3 pha kiến tạo quyết định."+
                 "Bàn thắng mà Dembele ghi vào lưới Bilbao cuối tuần qua là khoảnh khắc kỳ diệu, khi anh xử lý cá nhân rồi dứt điểm ở góc hẹp. Những gì Dembele thể hiện khi trở lại sau giai đoạn chấn thương khiến MU mê mẩn. Theo báo chí Tây Ban Nha, MU đã liên hệ với người đại diện Moussa Sissoko để tìm kiếm thỏa thuận về điều khoản hợp đồng."+
                 "MU không ngại chi đậm để thuyết phục Dembele cập bến sân Old Trafford theo dạng chuyển nhượng tự do. Các quan chức MU muốn dành cho cựu cầu thủ Dortmund khoản tiền lương 250.000 bảng mỗi tuần, tương đương với Anthony Martial - người hiện đá cho Sevilla theo dạng cho mượn."+
                 "Tuy nhiên, Moussa Sissoko cho rằng con số này chưa đúng với mong muốn của tiền đạo bóng đá quốc tế người Pháp. Barca đang có động thái thuyết phục Dembele gia hạn. Vì thế, cầu thủ 24 tuổi này lấy đó làm căn cứ để đòi hỏi con số cao hơn từ MU."+
                 "Dembele muốn mức lương ngang với nhóm tân binh mùa hè năm ngoái là Raphael Varane và Jadon Sancho, những người nhận 340.000 và 350.000 bảng/tuần. Ngoài ra, Moussa Sissoko cũng muốn khoản tiền thưởng hợp đồng đáng kể cho người đại diện cũng như cá nhân Dembele, ước tính không dưới 20 triệu bảng.",
                TypeTemplate = 0
            },
              new NewsItem()
            {
                Picture = "https://photo-baomoi.zadn.vn/w300_r3x2_sm/2022_03_01_114_41898170/150275fce2be0be052af.jpg",
                Title = "MU, Man City, Liverpool, Chelsea kiếm tiền ‘khủng’ từ học viện trẻ",
                SubTitle = "(PLO)- Các CLB Premier League như Manchester United, Manchester City, Liverpool, Arsenal hay Chelsea kiếm được rất nhiều tiền nhờ bán “lúa non” nhưng nó chưa là gì so với các CLB khác của châu Âu.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="Theo thống kê, các CLB ở Premier League gồm Liverpool, Manchester United, Manchester City, Arsenal và Chelsea đều nằm trong Top 50 kiếm được nhiều tiền nhất thế giới từ học viện đào tạo trẻ của mình."+
                  "Tuy nhiên, MU và các thành viên nằm trong nhóm Big Six Premier League còn tụt lại một khoảng khá xa so với các đội bóng hàng đầu châu Âu khác từ khoản thu “bán lúa non”. Chelsea là CLB sở hữu học viện trẻ có lợi nhuận cao nhất ở Premier League nhưng chỉ xếp ở vị trí thứ 8 tại châu Âu."+
                  "Liverpool, Manchester United, Man City, Arsenal, Chelsea và Tottenham đều nằm trong top 50 học viện kiếm tiền nhiều nhất trong bóng đá thế giới, mặc dù không đội nào của Premier League góp mặt trong Top 7."+
                  "Số liệu từ CIES Football Observatory đã đưa ra kết quả đáng ngạc nhiên khi không có CLB Premier League nào góp mặt trong Top 7. Đứng đầu danh sách là gã khổng lồ bóng đá Bồ Đào Nha Benfica khi họ kiếm được 317 triệu bảng Anh từ việc bán các sao trẻ trong 7 năm qua."+
                  "Với việc AS Monaco bán Kylian Mbappe cho PSG với giá kỷ lục, CLB công quốc nước Pháp này đứng thứ ba với doanh thu 238 triệu bảng Anh. Thu nhập từ việc bán Mbappe cho PSG đã chiếm 63% tổng doanh thu bán sao trẻ của AS Monaco."+
                  "Những CLB còn lại nằm trong Top 10 lần lượt là Bayer Leverkusen (178 triệu bảng Anh), Atalanta (176 triệu bảng Anh), Chelsea (175 triệu bảng Anh), Sporting Lisbon (174 triệu bảng Anh) và Arsenal (143 triệu bảng Anh)."+
                  "Việc Tammy Abraham chuyển sang AS Roma làm học trò của Jose Mourinho vào mùa hè năm ngoái đã chiếm 21% trong tổng số 175 triệu bảng mà Chelsea thu về. Các CLB lớn khác ở Premier League nằm trong Top 50 lần lượt là Liverpool (11), Man City (18), Aston Villa (23), Tottenham (31), Leicester City (39) và MU (49).",
                TypeTemplate = 0
            },new NewsItem()
            {
                ListPicture = new ObservableCollection<string>(){ "https://photo-cms-tpo.zadn.vn/w645/Uploaded/2022/lzwlzsg-eafzljmgfy/2022_03_01/afc-5077.jpg", "https://photo-cms-tpo.zadn.vn/w645/Uploaded/2022/lzwlzsg-eafzljmgfy/2022_03_01/afc-2-1664.jpg", },
                Title = "CLB Trung Quốc rút khỏi Champions League, lỡ cơ hội đối đầu HAGL",
                SubTitle = "TPO - CLB Changchun Yatai của Trung Quốc vừa đi đến quyết định rút lui khỏi trận play-off AFC Champions League 2022.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="AFC cho biết trong thông báo chính thức: “Theo Quy chế thi đấu của AFC Champions League 2022, trận play-off với Changchun Yatai dự kiến vào ngày 15/3 sẽ bị hủy bỏ; đội thắng ở trận còn lại sẽ được xếp thẳng vào bảng H”."+
                "Như vậy, đội thắng trong cặp Sydney FC - Kaya sẽ là cái tên còn lại trong bảng H của Hoàng Anh Gia Lai, đại diện duy nhất của Việt Nam. Ngoài ra còn là Jeonbuk và Yokohama Mariners."+
                "Với tương quan quá chênh lệch giữa một đại diện của Australia và một của Philippines, có thể khẳng định gần như chắc chắn Sydney FC sẽ chung bảng với HAGL. Như vậy, khả năng diễn ra cuộc đối đầu giữa hai đại diện của hai nền bóng đá Việt Nam và Trung Quốc đã không thể xảy ra."+
                "Trước đó, AFC đã công bố lịch thi đấu AFC Champions League 2022. Vòng bảng khu vực Đông Á sẽ thi đấu từ ngày 15/4 đến 1/5 tại Thái Lan, Malaysia và Việt Nam. Điều này có nghĩa là các đại diện của Super League sẽ phải ra nước ngoài thi đấu."+
                "Đây gần như là điều không thể trong bối cảnh hiện tại. Bởi nếu quay lại Trung Quốc, họ vẫn phải trải qua một đợt cách ly dài 2-3 tuần. Trong khi đó, giải VĐQG Trung Quốc đã diễn ra được nhiều vòng."+
                "Và điều này sẽ càng khiến các CLB Trung Quốc mất điểm trên BXH tổng của AFC. Trong tương lai gần, rất có thể họ sẽ bị cắt suất nếu vẫn tiếp tục “đá cho xong” như hiện tại.",
                TypeTemplate = 2
            },new NewsItem()
            {
                Picture = "https://image.vtc.vn/resize/th/upload/2022/03/01/zinchenko-yeu-cau-trung-phat-nga-15141641.jpeg",
                Title = "Hậu vệ Ukraine yêu cầu khai trừ Nga khỏi thể thao thế giới",
                SubTitle = "(VTC News) - Hậu vệ Oleksandr Zinchenko của Man City đưa ra thông điệp yêu cầu khai trừ các vận động viên Nga khỏi tất cả các môn thể thao, không chỉ riêng bóng đá.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="Trên trang cá nhân, hậu vệ Oleksandr Zinchenko của Man City đưa ra thông điệp đề nghị thế giới cần khai trừ Nga khỏi tất cả các môn thể thao, không chỉ riêng bóng đá, bóng rổ hay một số môn phổ biến khác."+
                "Cụ thể, cầu thủ trẻ người Ukraine đưa ra 5 yêu cầu, bao gồm: Loại trừ Nga khỏi tất cả các môn thể thao; cấm tất cả các VĐV Nga tham dự bất kỳ giải đấu quốc tế nào; ngừng bán bản quyền phát sóng các giải đấu thể thao quốc tế cho truyền thông Nga; cấm các công ty Nga làm tài trợ cho các giải đấu, các CLB quốc tế; ủng hộ Ukraine."+
                "Phản ứng của Zinchenko xuất phát từ cuộc xung đột vũ trang giữa Nga và Ukraine. Hôm 24/2, quân đội Nga tấn công các mục tiêu quân sự của Ukraine ở miền Đông, dẫn đến căng thẳng leo thang giữa hai nước. Nhiều CLB, cầu thủ trên khắp thế giới đã bày tỏ thông điệp phản đối chiến tranh, đòi lại công bằng cho người dân Ukraine."+
                "Nó có tính chất phân biệt, đối xử rõ ràng và ảnh hưởng đến số lượng lớn vận động viên, huấn luyện viên và nhân viên của các CLB và ĐTQG và hàng triệu người hâm mộ Nga và nước ngoài. Những hành động như vậy đang chia rẽ cộng đồng thể thao thế giới vốn luôn tuân thủ các nguyên tắc bình đẳng, tôn trọng lẫn nhau và độc lập khỏi chính trị"+
                "Theo báo chí quốc tế, Nga có thể kiện FIFA, UEFA lên Tòa án Trọng tài Thể thao (CAS) để đảo ngược quyết định này.",
                TypeTemplate = 0
            },
            new NewsItem() {
                TitleSource = ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_premier.png"),
                Title = "Ngoại hạng Anh",
                RightTitle = "Xem tất cả...",
                TypeTemplate = 3
            },
            new NewsItem()
            {
                Picture = "https://image.thanhnien.vn/w1024/Uploaded/2022/tpuoahu/2021_10_30/2021-10-26t205353z-128636112-up1ehaq1m1rbt-rtrmadp-3-soccer-england-ars-lee-report-5238.jpeg",
                Title = "Thực hư số tiền Arsenal đã chi vào TTCN mùa Hè năm ngoái",
                SubTitle = "Arsenal đã có một mùa chuyển nhượng mùa Hè khá thành công và mới đây các báo cáo đã chỉ ra con số thực chi của Pháo thủ.",
                Resource ="bongda.com.vn",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="",
                TypeTemplate = 0
            },new NewsItem()
            {
                Picture = "https://vnn-imgs-f.vgcloud.vn/2022/03/01/11/ronaldo-mu.jpg",
                Title = "Thỉnh thoảng Ronaldo được phép có một vài trận đấu kém",
                SubTitle = "Cựu tiền đạo Dimitar Berbatov đã có những chia sẻ đáng chú ý xoay quanh tình hình của Cristiano Ronaldo.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="",
                TypeTemplate = 1
            },new NewsItem()
            {
                Picture = "https://static.bongda24h.vn/medias/original/2020/8/13/cau-thu-james-milner.jpg",
                Title = "Gạt Salah, Mane, Milner chọn ai làm đồng đội tiền đạo xuất sắc nhất?",
                SubTitle = "Lão tướng James Milner vừa tiết lộ đội hình đồng đội xuất sắc nhất trong quá khứ và hiện tại của anh",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="",
                TypeTemplate = 0
            },
            new NewsItem() {
                TitleSource = ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_nc_league1.png"),
                Title = "League 1",
                RightTitle = "Xem tất cả...",
                TypeTemplate = 3
            },
            new NewsItem()
            {
                Picture = "https://image.bongda24h.vn/medias/480x300twebp/original/2022/3/1/ramos-roi-psg-vao-he-2022.jpg",
                Title = "PSG lên kế hoạch bán Sergio Ramos",
                SubTitle = "Dù mất nhiều công sức thuyết phục đội trưởng Real Madrid về đầu quân, nhưng PSG lại không thể có sự phục vụ của Sergio Ramos với những chấn thương dày đặc của cầu thủ này.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="",
                TypeTemplate = 0
            },new NewsItem()
            {
                Picture = "https://image.bongda24h.vn/medias/320x200twebp/original/2022/2/1/doi-bong-cua-beckham-tuyen-bo-se-doc-suc-chieu-mo-messi.jpg",
                Title = "Đội bóng của Beckham tuyên bố sẽ dốc sức chiêu mộ Messi",
                SubTitle = "Một cổ đông lớn khác của Inter Miami là Jorge Mas khẳng định đội bóng này sẽ nỗ lực chiêu mộ Messi nhờ mối quan hệ của David Beckham với ngôi sao bên phía PSG.",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="",
                TypeTemplate = 0
            },new NewsItem()
            {
                Picture = "https://image.bongda24h.vn/medias/320x200twebp/original/2022/2/27/soi-keo-lyon-vs-lille-vdqg-phap-hom-nay.jpg",
                Title = "Nhận định bóng đá Lyon vs Lille 2h45 ngày 28/2 (Ligue 1 2021/22)",
                SubTitle = "",
                Resource ="baomoi.com",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="",
                TypeTemplate = 1
            },
        };

        public static ObservableCollection<NewsItem> LotteryNews = new ObservableCollection<NewsItem>()
        {
            new NewsItem() {
                TitleSource = ImageSource.FromResource("KetQuaSoBong.Resources.Images.ic_fire.png"),
                Title = "Tin nóng xổ số",
                TypeTemplate = 3
            },
            new NewsItem()
            {
                Picture = "https://image.vtc.vn/resize/th/upload/2021/12/22/trung-so4-11005703.jpg",
                Title = "Cả làng trúng số 250 tỷ đồng trong dịp Giáng Sinh",
                SubTitle = "Hàng trăm người dân tại ngôi làng Cliffe, Vương Quốc Anh đã vô cùng sung sướng khi cả làng trúng số với tổng giá trị hơn 250 tỷ đồng ngay trong dịp Giáng Sinh.",
                Resource ="Xskt.com.vn",
                TimeCreated = new DateTime(2022,3,1,10,17,00),
                Content="Hơn 500 người dân trong ngôi làng Cliffe ở Vương Quốc Anh đã nhận được món quà vô cùng ý nghĩa ngay trong dịp Giáng Sinh. Cả làng cùng nhau chia giải độc đắc hơn 250 tỷ đồng (8,4 triệu bảng Anh)."+
                "Đây được xem là kỳ mở thưởng có số người trúng giải đông nhất và có giá trị lớn nhất từ trước đến nay tại Anh. Sự may mắn đã đến thật bất ngờ với ngôi làng Cliffe này. Người dân ở đây xem như đó là món quà lớn nhất mà Chúa đã ban cho người dân nơi đây."+
                "Trong làng có 1 người chơi trúng giải độc đắc của xổ số bưu điện với giá trị giải thưởng 684. 750 bảng Anh (hơn 20 tỷ đồng). 9 người may mắn trúng giải 342. 375 bảng Anh (hơn 10 tỷ đồng). Và 537 người chơi khác giành giải thưởng từ 7. 522 đến 22. 566 bảng Anh."+
                "Những người dân nơi đây hết sức vui mừng họ không nói thành lời khi tất cả mọi người nơi đây đều đón một Giáng Sinh thật tưng bừng sau những ngày tháng khó khăn."+
                "Danyl Johnson - người dẫn chương trình Xổ số bưu điện nhân dân đã gửi lời chúc mừng đến tất cả những người trúng giải trong ngôi làng này. Và anh cảm thấy vui mừng hơn cả người dân nơi đây khi mang đến tin tức tốt lành đến với họ.",
                TypeTemplate = 1
            },
            new NewsItem()
            {
                Picture = "https://static.xoso.wap.vn/img/A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202022-03-01%20lu%CC%81c%2008_22_28.png",
                Title="Soi cầu XSMB 1/3/2022 - Dự đoán Xổ Số Miền Bắc thứ 3",
                SubTitle ="Soi cầu XSMB ngày 1/3/2022 hôm nay chính xác nhất - Dự đoán soi cầu XSMB hôm nay được các chuyên gia nghiên cứu phân tích và đánh giá dựa trên bảng kết quả ngày mở thưởng trước đó. ",
                Resource="xoso.wap.vn",
                Content="Muốn dự đoán kết quả xổ số miền Bắc miễn phí - KQ XSMB thứ 3 ngày 1/3/2022 một cách chính xác, các bạn cần dựa vào các phương pháp tính toán, các thống kê để tìm ra quy luật, phân tích kết quả xổ số hôm qua, tuần trước, tuần trước nữa, nắm được đề hôm qua về bao nhiêu, bắt lô rơi từ đềm chốt số giải đặc biệt miền Bắc cho ngày mai."+
                "Trước khi tham khảo những cặp số đẹp hôm nay, mời các bạn xem lại xổ số miền Bắc ngày hôm qua:"+
                "Dựa vào các thuật toán xác suất thống kê xsmb, phân tích xsmb ngày 1/3/2022 các kết quả gần nhất của xổ số Miền Bắc do các chuyên gia, cao thủ soi cầu xsmb ngày 1/3/2022 . ",
                TimeCreated =new DateTime(2022,2,28,08,31,00),
                TypeTemplate= 0
            },
            new NewsItem()
            {
                ListPicture= new ObservableCollection<string>()
                {
                    "https://media.vietlott.vn/vi/12.2021/system/archivedate/gfyegfu.jpg",
                    "https://media.vietlott.vn/vi/12.2021/system/archivedate/ggu.jpg",
                    "https://media.vietlott.vn/vi/12.2021/system/archivedate/tr3gr.png",
                    "https://media.vietlott.vn/vi/12.2021/system/archivedate/hfueif.png",
                    "https://media.vietlott.vn/vi/12.2021/system/archivedate/fhne.png"
                },
                Title="Top 5 địa phương có duyên nhất với giải Jackpot của Vietlott",
                SubTitle ="Hãy cùng xskt.com.vn điểm qua 5 địa phương được giải Jackpot của XS Mega 6/45 và XS Power 6/55 ghé thăm nhiều nhất từ trước tới nay trong bài viết dưới đây nhé.",
                Resource="Xskt.com.vn ",
                TimeCreated =new DateTime(2022,2,28,11,03,00),
                Content="Sau 10 năm thành lập (05/12/2011 – 05/12/2021) với gần 5 năm chuẩn bị kinh doanh và hơn 5 năm chính thức kinh doanh; Vietlott đã phủ sóng 62/63 tỉnh, thành phố của nước ta. Ước tính đến ngày 05/12/2021, Vietlott đã trả thưởng khoảng 13.000 tỷ đồng cho khách hàng trúng thưởng, đóng góp gần 6.200 tỷ đồng vào ngân sách các địa phương. Rất nhiều khách hàng của Vietlott may mắn trở thành tỷ phú nhờ giải Jackpot của XS Mega 6/45 và XS Power 6/55. Dưới đây là 5 địa phương may mắn được giải Jackpot ghé thăm nhiều nhất từ trước tới nay."+
                "Top 1: TP HCM là 'mảnh đất vàng' với 113 giải Jackpot"+
                "Top 2: Thủ đô Hà Nội với 39 giải Jackpot"+
                "Top 3: Cần Thơ với 15 giải Jackpot"+
                "Top 4: Đồng Nai với 11 giải Jackpot"+
                "Top 5: Bình Dương, Đắk Lắk, Đà Nẵng với 9 giải Jackpot",
                TypeTemplate=2
            },
            new NewsItem()
            {
                Picture = "https://cdn.tuoitre.vn/thumb_w/586/2020/2/19/photo-1-15821031354031418608241.jpg",
                Title="Những con số thú vị về việc trúng xổ số ở Việt Nam",
                SubTitle ="Ở Việt nam, việc chơi xổ số giống như một nhu cầu giải trí không thể thiếu của nhiều người. Những số liệu dưới sau đây có lẽ sẽ giúp cho bạn hiểu rõ hơn..",
                Resource="Xskt.com.vn",
                TimeCreated =new DateTime(2022,2,28,09,59,00),
                Content="Ở Việt nam, việc chơi xổ số giống như một nhu cầu giải trí không thể thiếu của nhiều người. Những số liệu dưới sau đây có lẽ sẽ khiến cho bạn hiểu rõ hơn về những người trúng xổ số tại Việt Nam."+
                "Nguyên nhân nào làm người ta mua vé số?"+
                "Căn cứ khảo sát mới đây, có tới 78% người tham gia chơi với mục đích cầu may mắn. Trong đó, có tới 6 trong 10 người khi được hỏi chọn mua vé Vietlott vì giải thưởng 'khủng'."+
                "Giải Jackpot có giá trị lớn nhất từ trước tới nay?"+
                "Tình tới nay, Việt Nam ghi nhận ông Q. là đã là chủ nhân của giải thưởng Jackpot khủng nhất, trị giá lên tới gần 304 tỉ đồng tại kỳ quay số mở thưởng 119 diễn ra tối ngày 05 tháng 5 năm 2018. Ông Q. sau đó cũng đã lấy ra số tiền 03 tỉ đồng để làm từ thiện với hy vọng chia sẻ sự may mắn với mọi người có hoàn cảnh khó khăn.",
                TypeTemplate= 0
            },

            new NewsItem()
            {
                Picture = "https://cdn.24h.com.vn/upload/4-2021/images/2021-10-23/Moi-ngay-co-bao-nhieu-nguoi-trung-thuong-xo-so-so-xo-1-1634961228-677-width600height338.jpg",
                Title="Xổ số miền Bắc: Mỗi ngày có bao nhiêu người trúng xổ số?",
                SubTitle ="Đối với xổ số miền Bắc, giải độc đắc chỉ bao gồm 05 chữ số, tuy nhiên lại có những 03 giải độc đắc. Mỗi giải trị giá 1 tỷ đồng. Như vậy, mỗi ngày XSMB có..",
                Resource="Xskt.com.vn ",
                TimeCreated =new DateTime(2022,2,28,11,03,00),
                Content="Xổ số miền Bắc gồm dãy dự thưởng với 5 chữ số, chạy từ 00000 đến 99999. Khu vực miền Bắc sẽ quay thưởng cùng nhau, quy về một địa điểm, một đài quay thưởng duy nhất. Số liệu thực tế cho biết, lượng vé Xổ số miền Bắc được bán ra ít hơn khá nhiều so với 02 khu vực còn lại. Điều này có nghĩa, xác suất trúng số tại khu vực này cũng tương đối thấp." +
                "Đối với xổ số miền Bắc, giải độc đắc chỉ bao gồm 05 chữ số, tuy nhiên lại có những 03 giải độc đắc. Mỗi giải trị giá 1 tỷ đồng. Áp dụng với tỷ lệ phát hành xổ số như vậy, cơ hội trúng của từng tấm vé tương ứng là 1/100. 000. Mặc dù theo tính toán lý thuyết là như thế, trên thực tế tỷ lệ trúng giải thấp hơn khá nhiều. Trung bình khoảng từ 05 đến 07 ngày mới tìm được người trúng giải độc đắc."+
                "Đối với giải khuyến khích, giải có số lượng nhiều, lên tới 15. 000 vé cho phép người tham gia sở hữu nhiều cơ hội trúng giải hơn. Hơn thế nữa, cơ cấu giải thưởng cũng 'dễ thở' hơn khi chỉ yêu cầu 02 số cuối của tấm vé trùng với giải đặc biệt của ngày quay thưởng.",
                TypeTemplate=0
            }
        };

        public static ObservableCollection<LotteryCheckItem> LotteryCheckItems = new ObservableCollection<LotteryCheckItem>()
        {
            new LotteryCheckItem() { Number = "10", Time=1},
            new LotteryCheckItem() { Number = "12", Time=1},
            new LotteryCheckItem() { Number = "16", Time=1},
            new LotteryCheckItem() { Number = "31", Time=1},
            new LotteryCheckItem() { Number = "33", Time=1},
            new LotteryCheckItem() { Number = "36", Time=1},
            new LotteryCheckItem() { Number = "37", Time=1},
            new LotteryCheckItem() { Number = "40", Time=1},
            new LotteryCheckItem() { Number = "42", Time=1},
            new LotteryCheckItem() { Number = "46", Time=1},
            new LotteryCheckItem() { Number = "51", Time=1},
            new LotteryCheckItem() { Number = "53", Time=1},
            new LotteryCheckItem() { Number = "55", Time=1},
            new LotteryCheckItem() { Number = "56", Time=1},
            new LotteryCheckItem() { Number = "73", Time=1},
            new LotteryCheckItem() { Number = "75", Time=1},
            new LotteryCheckItem() { Number = "79", Time=1},
            new LotteryCheckItem() { Number = "84", Time=1},
            new LotteryCheckItem() { Number = "86", Time=1},
            new LotteryCheckItem() { Number = "88", Time=1},
            new LotteryCheckItem() { Number = "89", Time=1}
        };

        public App(IPlatformInitializer initializer)
            : base(initializer)
        {
        }

        protected override async void OnInitialized()
        {
            InitializeComponent();

            await NavigationService.NavigateAsync("NavigationPage/MainPage");
            Preferences.Set("Date", DateTime.Now.ToString("dd/MM/yyyy"));
            Preferences.Set("NumLog", 1);
            if (Preferences.Get("NumLog", 0) == 0)
            {
                Preferences.Set("IsLogin", false);
            }

            Preferences.Set("S", "rdNam");
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterSingleton<IAppInfo, AppInfoImplementation>();

            containerRegistry.RegisterForNavigation<NavigationPage>();
            containerRegistry.RegisterForNavigation<MainPage, MainPageViewModel>();
            containerRegistry.RegisterForNavigation<SplashScreen, SplashScreenViewModel>();
            containerRegistry.RegisterForNavigation<MainPageFlyout, MainPageFlyoutViewModel>();
            containerRegistry.RegisterForNavigation<LotteryCheckPage, LotteryCheckPageViewModel>();
            containerRegistry.RegisterForNavigation<UserProfilePage, UserProfilePageViewModel>();
            containerRegistry.RegisterForNavigation<LoginPage, LoginPageViewModel>();
            containerRegistry.RegisterForNavigation<SignUpPage, SignUpPageViewModel>();
            containerRegistry.RegisterForNavigation<NorthLotteryPage, NorthLotteryPageViewModel>();
            containerRegistry.RegisterForNavigation<VotePage, VotePageViewModel>();
            containerRegistry.RegisterForNavigation<SouthLotteryPage, SouthLotteryPageViewModel>();
            containerRegistry.RegisterForNavigation<CentralLotteryPage, CentralLotteryPageViewModel>();
        }
    }
}