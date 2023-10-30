// import "./Home.scss";
import SlideShow from "./SlideShow/slideshow";
import CardCars from "./SlideShow/CarCard/carCard";
const Home = () => {
  const listImage = document.getElementsByClassName(".container");
  console.log(listImage);

  return (
    <>
      <div className="home-container">
        <h4 className="Maxim">
          Customers could buy the Ford Model T in any color they wanted, as long
          as it was black
        </h4>

        <SlideShow></SlideShow>
        <CardCars></CardCars>
        <div style={{ color : "rgb(30, 48, 80)" }}>
          Được thành lập năm 1995, Ford Việt Nam là công ty liên doanh giữa Tập
          đoàn Ford Motor có trụ sở ở Michigan, Hoa Kỳ (75%) và Công ty Diesel
          Sông Công (25%) với tổng vốn đầu tư đến nay là hơn 126 triệu USD. Ford
          Việt Nam tự hào là công ty Hoa Kỳ đầu tiên đầu tư vào Việt Nam kể từ
          khi hai quốc gia bình thường hóa quan hệ ngoại giao. Hoạt động của
          Ford tại Việt Nam bao gồm lắp ráp xe hơi, tiếp thị, bán hàng và chăm
          sóc khách hàng. Bên cạnh hai văn phòng đại diện tại Hà Nội và TP. Hồ
          Chí Minh, Ford vận hành nhà máy lắp ráp được đặt tại Hải Dương (cách
          Hà Nội 55km) với công suất đạt 14.000 xe một năm. Ford Việt Nam hiện
          đang có khoảng 700 cán bộ công nhân viên tại các trụ sở ở Hà Nội, TP.
          Hồ Chí Minh và nhà máy ở Hải Dương; cùng với đó là hơn 5.000 lao động
          tại hệ thống các đại lý ủy quyền và trung tâm dịch vụ trên toàn quốc.
          Ford cam kết sử dụng mọi nguồn lực toàn cầu của mình để đem đến cho
          khách hàng Việt Nam những sản phẩm ưu việt và trải nghiệm tuyệt vời,
          đó là các dòng sản phẩm xe du lịch, xe thương mại, xe bán tải với các
          tính năng vượt trội, thiết kế hiện đại, thông minh, an toàn, chất
          lượng và tiết kiệm nhiên liệu. Hoạt động tại Việt Nam, Ford cam kết
          đóng góp vào sự phát triển bền vững của cộng đồng lân cận, cả về kinh
          tế và xã hội.
        </div>
        <img src="https://www.ford.com.vn/content/ford/vn/vi_vn/home/about/jcr:content/par/common_box/generalParsys/image/image.imgs.full.high.jpg"
        style={{ width:"100%" , marginTop : "30px" , marginBottom : "25px"}} />
      </div>
    </>
  );
};

export default Home;
