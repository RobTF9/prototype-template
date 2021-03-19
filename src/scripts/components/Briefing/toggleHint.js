const toggleHint = ({ index, setData }) => {
  setData(data => ({
    ...data,
    hints: {
      ...data.hints,
      viewedHints: data.hints.viewedHints.map((hint, hintIndex) => {
        if (hintIndex === index) {
          return { ...hint, show: !hint.show };
        }

        return hint;
      }),
    },
  }));
};

export default toggleHint;
