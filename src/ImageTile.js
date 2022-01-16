function ImageTile(props) {
  const {
    url,
    title,
    date,
    explanation
  } = props.image;
  const {
    hideExplanation,
    unhideExplanation
  } = props;
  return (
    <div className="ImageTile">
      <img src={url} alt={title}/>
      <h2 className="title">{title}</h2>
      <p className="date">{(new Date(date)).toDateString()}</p>
      <p className="explanation" onMouseOver={unhideExplanation()}>{explanation}</p>
    </div>
  );
}

export default ImageTile;