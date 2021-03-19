import jsonRequest from '../../common/jsonRequest';
import parseMarkdown from '../../common/parseMarkdown';

const getHint = async ({ url, setData, setLoading, setHintError }) => {
  try {
    setHintError(null);
    setLoading(true);
    const response = await jsonRequest(`${url}/hint`);

    if (response.status === 200) {
      const hint = await response.json();

      const newHint = {
        ...hint,
        content: parseMarkdown(hint.content),
        show: true,
      };

      setData(data => ({
        ...data,
        hints: {
          ...data.hints,
          viewedHints: [...data.hints.viewedHints, newHint],
        },
        penalty: (data.hints.viewedHints.length + 1) * data.hints.penalty,
      }));
      setLoading(false);
      return;
    }

    setHintError('Unexpected hint response');
    setLoading(false);
  } catch (error) {
    setHintError('Unexpected hint response');
    setLoading(false);
  }
};

export default getHint;
