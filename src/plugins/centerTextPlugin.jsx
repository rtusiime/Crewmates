const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw: (chart) => {
    const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;

    // Get the text from the options
    const centerText = chart.options.plugins.centerTextPlugin;
    if (centerText && centerText.text) {
      ctx.save();
      ctx.font = '16px Arial'; // Adjust font size here as needed
      ctx.fillStyle = centerText.color || '#000'; // Default color: black
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = left + (width / 2);
      const centerY = top + (height / 2);
      ctx.fillText(centerText.text, centerX, centerY);
      ctx.restore();
    }
  }
};

export default centerTextPlugin;