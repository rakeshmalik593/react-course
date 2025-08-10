import "../styles/Shimmer.css"



const Shimmer = () => {
  const shimmerCards = Array(10).fill(0)

  return (
  <div className="shimmer-container">
      {shimmerCards.map((_, index) => (
        <div className="shimmer-card shimmer-animate" key={index}>
          <div className="shimmer-img"></div>
          <div className="shimmer-line"></div>
          <div className="shimmer-line" style={{ width: "70%" }}></div>
        </div>
      ))}
    </div>
  );
};
export default Shimmer;
