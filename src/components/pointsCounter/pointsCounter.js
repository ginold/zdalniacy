import React, { useEffect } from 'react';
import { connect } from 'react-redux'

function PointsCounter(props) {
  const [points, setPoints] = React.useState(0)

  useEffect(() => {
    let from = props.from
    let to = props.to
    let incr;
    console.log(from, to)

    if (from < to) {
      incr = 10;
    } else {
      incr = -10;
    }

    if (from === 0) {
      setPoints(to)
    } else {
      const interval = setInterval(() => {
        from = from + incr
        if (incr > 0) {
          if (from >= to) clearInterval(interval)
        } else {
          if (from <= to) clearInterval(interval)
        }
        setPoints(from)
      }, 30)
    }
  }, [props])

  return <span className="points">{points}</span>;
}

const mapStateToProps = state => {
  return { from: state.userData.prevPoints, to: state.userData.points }
}

export default connect(mapStateToProps)(PointsCounter);
