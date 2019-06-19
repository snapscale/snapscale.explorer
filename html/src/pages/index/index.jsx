import React from 'react';

class Index extends React.Component {
    render() {
        return pug`
            .wrapper
                p.greeting Hello WorldX!
            button Click Me
        `
    }
}

export default Index