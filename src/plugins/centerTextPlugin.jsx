const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    const { top, left, width, height } = chartArea;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const outerRadius = chart._metasets[0].data[0].outerRadius;
    const innerRadius = chart._metasets[chart._metasets.length - 1].data[0].innerRadius;
    // console.log("innerRadius", ctx);

    const centerText = chart.options.plugins.centerTextPlugin;
    if (centerText && centerText.text) {
      ctx.save();
      ctx.font = `${innerRadius+10}px Pokemon Solid`; // Set font to some fraction of the doughnut's innerRadius
      ctx.fillStyle = '#363b81'; // Default color: black
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(centerText.text, centerX, centerY+15);
      ctx.restore();
    }
  }
};

export default centerTextPlugin;