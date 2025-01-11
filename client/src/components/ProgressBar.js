const ProgressBar = (props) => {
    var { bgcolor, completed } = props;

    console.log("BG:", bgcolor)
    console.log("completed", completed)
  
    const containerStyles = {
      height: 20,
      width: '300px',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 50
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 20,
      color: 'black',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <div style={labelStyles}>{`${completed}%`}</div>
          {console.log("COmpleted",completed)}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;