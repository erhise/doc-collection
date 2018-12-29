import gray from 'gray-percentage';

const colors = {
    gatsby: `#266777`,
    // gatsby: `#663399`,
    gatsbyDark: `#442266`,
    gatsbyDarker: `#22133`,
    lemon: `#ffdf37`,
    mint: `#73fff7`,
    mustard: `#ffb238`,
    ui: {
        border: `#ede7f3`,
        bright: `#e0d6eb`,
        light: `#f5f3f7`,
        whisper: `#fbfafc`,
    },
    gray: {
        dark: gray(8, 270),
        copy: gray(12, 270),
        lightCopy: gray(35, 270),
        calm: gray(46, 270),
        bright: gray(64, 270),
        light: gray(80, 270),
        superLight: gray(96, 270),
    },
    code: {
        bg: `#fdfaf6`, // colors.a[0] #fcf6f0
        border: `#faede5`,
        text: `#866c5b`,
        remove: `#e45c5c`,
        add: `#4a9c59`,
        selector: `#b3568b`,
        tag: `#4084a1`,
        keyword: `#538eb6`,
        comment: `#6f8f39`,
        punctuation: `#53450e`,
        regex: `#d88489`,
        cssString: `#a2466c`,
        invisibles: `#e0d7d1`,
        scrollbarThumb: `#f4d1c6`,
        lineHighlightBorder: `#f1beb6`,
    },
}

export default colors;
