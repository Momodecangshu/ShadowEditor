import { PropertyGrid, PropertyGroup, TextProperty, DisplayProperty, CheckBoxProperty, NumberProperty, IntegerProperty } from '../../../third_party';
import SetGeometryCommand from '../../../command/SetGeometryCommand';

/**
 * 花托组件
 * @author tengge / https://github.com/tengge1
 */
class TorusGeometryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: true,
            radius: 1,
            tube: 1,
            radialSegments: 16,
            tubularSegments: 16,
            arc: Math.PI * 2,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, radius, tube, radialSegments, tubularSegments, arc } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={L_GEOMETRY_COMPONENT} show={show} expanded={expanded} onExpand={this.handleExpand}>
            <NumberProperty name={'radius'} label={L_RADIUS} value={radius} onChange={this.handleChange}></NumberProperty>
            <NumberProperty name={'tube'} label={L_TUBE} value={tube} onChange={this.handleChange}></NumberProperty>
            <IntegerProperty name={'radialSegments'} label={L_RADIAL_SEGMENTS} value={radialSegments} onChange={this.handleChange}></IntegerProperty>
            <IntegerProperty name={'tubularSegments'} label={L_TUBULAR_SEGMENTS} value={tubularSegments} onChange={this.handleChange}></IntegerProperty>
            <NumberProperty name={'arc'} label={L_ARC} value={arc} onChange={this.handleChange}></NumberProperty>
        </PropertyGroup>;
    }

    componentDidMount() {
        app.on(`objectSelected.TorusGeometryComponent`, this.handleUpdate);
        app.on(`objectChanged.TorusGeometryComponent`, this.handleUpdate);
    }

    handleExpand(expanded) {
        this.setState({
            expanded,
        });
    }

    handleUpdate() {
        const editor = app.editor;

        if (!editor.selected || !(editor.selected instanceof THREE.Mesh) || !(editor.selected.geometry instanceof THREE.TorusBufferGeometry)) {
            this.setState({
                show: false,
            });
            return;
        }

        this.selected = editor.selected;

        const { radius, tube, radialSegments, tubularSegments, arc } = Object.assign({}, this.selected.geometry.parameters, {
            show: true,
        });

        this.setState({
            radius: radius === undefined ? 1 : radius,
            tube: tube === undefined ? 0.4 : tube,
            radialSegments: radialSegments === undefined ? 8 : radialSegments,
            tubularSegments: tubularSegments === undefined ? 16 : tubularSegments,
            arc: arc === undefined ? Math.PI * 2 : arc,
        });
    }

    handleChange(value, name) {
        this.setState({
            [name]: value,
        });

        if (value === null) {
            return;
        }

        const { radius, tube, radialSegments, tubularSegments, arc } = Object.assign({}, this.state, {
            [name]: value,
        });

        this.setState(state);

        app.editor.execute(new SetGeometryCommand(this.selected, new THREE.TorusBufferGeometry(
            radius,
            tube,
            radialSegments,
            tubularSegments,
            arc,
        )));

        app.call(`objectChanged`, this, this.selected);
    }
}

export default TorusGeometryComponent;