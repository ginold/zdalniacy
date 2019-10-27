import React, { Component } from 'react';
import './main.scss';

class Main extends Component {
  state = { mainWidth: 0 };
  sidemenuWidth = 0;
  // because aside is fixed position
  updateDimensions = (sidemenuWidth) => {
  //  this.setState({ mainWidth: window.innerWidth - parseInt(sidemenuWidth, 10)});
  };
  componentDidMount() {
  //   let sidemenu = document.getElementById("sidemenu");
  //   if (sidemenu) {
  //     this.sidemenuWidth = getComputedStyle(sidemenu).width
  //     console.log(sidemenu)
  //     this.setState({ mainWidth: window.innerWidth - parseInt(this.sidemenuWidth, 10)});
  //     window.addEventListener('resize', () => {this.updateDimensions(this.sidemenuWidth)});
  //   }
  // }
  }
  componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return ( <main style={{'width': this.state.mainWidth ? this.state.mainWidth : null + 'px', 
                           'marginLeft': this.sidemenuWidth ? this.sidemenuWidth : null }}>
      {this.props.children}
    </main>
    );
  }
}

export default Main;
