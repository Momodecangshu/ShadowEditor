import { PropertyGrid, PropertyGroup, TextProperty, DisplayProperty, CheckBoxProperty, NumberProperty } from '../../../third_party';
import SetGeometryCommand from '../../../command/SetGeometryCommand';

/**
 * 正方体组件
 * @author tengge / https://github.com/tengge1
 */
class BoxGeometryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: true,
            width: 1,
            height: 1,
            depth: 1,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, width, height, depth, widthSegments, heightSegments, depthSegments } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={L_GEOMETRY_COMPONENT} show={show} expanded={expanded} onExpand={this.handleExpand}>
            <NumberProperty name={'width'} label={L_WIDTH} value={width} onChange={this.handleChange}></NumberProperty>
            <NumberProperty name={'height'} label={L_HEIGHT} value={height} onChange={this.handleChange}></NumberProperty>
            <NumberProperty name={'depth'} label={L_DEPTH} value={depth} onChange={this.handleChange}></NumberProperty>
            <NumberProperty name={'widthSegments'} label={L_WIDTH_SEGMENTS} value={widthSegments} onChange={this.handleChange}></NumberProperty>
            <NumberProperty name={'heightSegments'} label={L_HEIGHT_SEGMENTS} value={heightSegments} onChange={this.handleChange}></NumberProperty>
            <NumberProperty name={'depthSegments'} label={L_DEPTH_SEGMENTS} value={depthSegments} onChange={this.handleChange}></NumberProperty>
        </PropertyGroup>;
    }

    componentDidMount() {
        app.on(`objectSelected.BoxGeometryComponent`, this.handleUpdate);
        app.on(`objectChanged.BoxGeometryComponent`, this.handleUpdate);
    }

    handleExpand(expanded) {
        this.setState({
            expanded,
        });
    }

    handleUpdate() {
        const editor = app.editor;

        if (!editor.selected || !(editor.selected instanceof THREE.Mesh) || !(editor.selected.geometry instanceof THREE.BoxBufferGeometry)) {
            this.setState({
                show: false,
            });
            return;
        }

        this.selected = editor.selected;

        const state = Object.assign({}, this.selected.geometry.parameters, {
            show: true,
        });

        this.setState(state);
    }

    handleChange(value, name, event) {
        const state = Object.assign({}, this.state, {
            [name]: value,
        });

        this.setState(state);

        app.editor.execute(new SetGeometryCommand(this.selected, new THREE.BoxBufferGeometry(
            state.width,
            state.height,
            state.depth,
            state.widthSegments,
            state.heightSegments,
            state.depthSegments,
        )));
    }
}

export default BoxGeometryComponent;