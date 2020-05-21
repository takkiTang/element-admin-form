<script>
export default {
  name: "render",
  functional: true,
  render(h, ctx) {
    return ctx.props.render(h, ctx.props,ctx.listeners);
  }
};
</script>
