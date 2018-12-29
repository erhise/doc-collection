import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import presets, { colors } from './presets';

const _options = {
    headerFontFamily: ['Futura PT', 'Roboto', 'Segoue UI', 'sans-serif'],
    bodyFontFamily: ['Spectral', 'Georgia', 'Times New Roman', 'Times', 'serif'],
    monospaceFontFamily: [
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Courier New',
        'monospace',
    ],
    systemFontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Ubuntu',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
    ],
    baseLineHeight: 1.4,
    baseFontSize: '16px',
    hederLineHeight: 1.075,
    headerColor: colors.gray.dark,
    bodyColor: colors.gray.copy,
    blockMarginBottom: 0.75,
    scaleRatio: 2,
    plugins: [new CodePlugin()],
    overrideStyles: ({ rhythm, scale }, options) => {
        return {
            'h1, h2, h4, h5, h6': {
                marginTop: rhythm(options.blockMarginBottom * 2),
                marginBottom: rhythm(options.blockMarginBottom),
                letterSpacing: '-0.0075em',
            },
            'ul, ol': {
                marginTop: rhythm(options.blockMarginBottom),
            },
            h1: {
                ...scale(4 / 5),
            },
            h3: {
                ...scale(2 / 5),
                lineHeight: 1,
                marginTop: rhythm(options.blockMarginBottom * 2),
                marginBottom: rhythm(options.blockMarginBottom / 2),
            },
            h4: {
                ...scale(1 / 5),
            },
            h5: {
                ...scale(0),
            },
            blockquote: {
                paddingLeft: rhythm(options.blockMarginBottom),
                marginLeft: 0,
                borderLeft: `${rhythm(options.blockMarginBottom / 4)} solid ${
                    colors.ui.light
                }`,
            },
            hr: {
                backgroundColor: colors.ui.light,
            },
            'tt, code , kbd, samp': {
                lineHeight: 'inherit',
            },
            'tt, code, kbd': {
                background: colors.code.bg,
                paddingTop: '0.2em',
                paddingBottom: '0.2em',
            },
            '.main-body a': {
                color: 'inherit',
                textDecoration: 'none',
                transition: `all ${presets.animation.speedFast} ${
                    presets.animation.curveDefault
                }`,
                borderBottom: `1px solid ${colors.ui.bright}`,
                boxShadow: `inset 0 -2px 0px 0px ${colors.ui.bright}`,
                fontFamily: options.headerFontFamily.join(','),
                fontWeight: 'bold',
            },
            '.main-body a:hover': {
                background: colors.ui.bright,
            },
            '.main-body a.anchor': {
                color: 'inherit',
                fill: colors.gatsby,
                textDecoration: 'none',
                borderBottom: 'none',
                boxShadow: 'none',
            },
            '.main-body a.anchor:hover': {
                background: 'none',
            },
            [presets.Mobile]: {
                html: {
                    fontSize: `${(17 / 16) * 100}%`,
                },
            },
            [presets.Tablet]: {
                html: {
                    fontSize: `${(18 / 16) * 100}%`,
                },
            },
            [presets.VVHd]: {
                html: {
                    fontSize: `${(21 / 16) * 100}%`,
                },
            },
        }
    }
}

const typography = new Typography(_options);

export const { scale, rhythm, options } = typography;
export default typography;
