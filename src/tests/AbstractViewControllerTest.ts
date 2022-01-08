import {
	ViewControllerId,
	ControllerOptions,
	SkillViewController,
	RenderOptions,
	ViewController,
	renderUtil,
} from '@sprucelabs/heartwood-view-controllers'
import {
	AbstractSpruceFixtureTest,
	ViewControllerFixture,
} from '@sprucelabs/spruce-test-fixtures'

export default abstract class AbstractViewControllerTest extends AbstractSpruceFixtureTest {
	protected static vcDir?: string
	protected static controllerMap: Record<string, any> | undefined
	private static viewFixture?: ViewControllerFixture

	protected static get views(): ViewControllerFixture {
		if (!this.viewFixture) {
			this.viewFixture = this.Fixture('view', {
				controllerMap: this.controllerMap,
				vcDir: this.vcDir,
			})
		}

		return this.viewFixture
	}

	protected static set views(views: ViewControllerFixture | undefined) {
		this.viewFixture = views
	}

	protected static async beforeEach(): Promise<void> {
		this.viewFixture = undefined
		await super.beforeEach()
	}

	protected static Controller<N extends ViewControllerId>(
		name: N,
		options: ControllerOptions<N>
	) {
		const controller = this.views.Controller(name, options)

		return controller
	}

	protected static getViewControllerFactory() {
		return this.views.getFactory()
	}

	protected static async load(
		vc: Pick<SkillViewController, 'load'>,
		args: Record<string, any> = {}
	) {
		return this.views.load(vc, args)
	}

	protected static render<VC extends ViewController<any>>(
		vc: VC,
		options?: RenderOptions | undefined
	): ReturnType<VC['render']> {
		return renderUtil.render(vc, options)
	}
}
