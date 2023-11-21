export const contrastBackgroundColor = (backgroundHex) => {
    const red = backgroundHex.substring(1, 3),
        green = backgroundHex.substring(3, 5),
        blue = backgroundHex.substring(5, 7);

    // http://www.w3.org/TR/AERT#color-contrast
    const brightness = Math.round(
        (parseInt(red, 16) * 299 +
            parseInt(green, 16) * 587 +
            parseInt(blue, 16) * 114) /
            1000
    );

    return brightness > 125 ? 'black' : 'white';
};
