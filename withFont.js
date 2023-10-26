import React from 'react';

const withFont = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <Component {...this.props} style={{ fontFamily: 'assets/fonts/DMSans.ttf' }} />
            );
        }
    };
};

export default withFont;