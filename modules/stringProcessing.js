import _ from 'lodash';

export const replaceSpaces = (
    string, replacement,
) =>
    _.replace(
        string,
        /\s+/g,
        replacement,
    );

export const trimEachWord = string =>
    replaceSpaces(
        _.trim(string), ' ',
    );

export const mapWords = (
    string, mapIteratee,
) => {
    const trimmedString = trimEachWord(string);
    const result = trimmedString
        ? _(trimmedString)
            .split(' ').map(mapIteratee)
            .join(' ')
        : '';

    return result;
};

export const appendToEachWord = (
    string, appendedPrefix,
) =>
    mapWords(
        string,
        word => `${word}${appendedPrefix}`,
    );

export const capitalizeWord = word =>
    word[0].toUpperCase() + word.slice(1);
