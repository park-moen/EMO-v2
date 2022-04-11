export default abstract class {
	public abstract showRenderView: () => Promise<string>;

	public abstract renderAfter: () => Promise<void>;
}
