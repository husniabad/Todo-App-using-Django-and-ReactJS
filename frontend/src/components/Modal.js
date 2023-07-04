import React, {Component} from "react";

import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
    ModalBody
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    handleChange = e => {
        const { name, value,type } = e.target;
        const inputValue = type === 'checkbox' ? e.target.checked :value;
        const activeItem = {...this.state.activeItem, [name]: inputValue};
        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props;
        const { title, description, completed } = this.state.activeItem;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Task</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                            type="text"
                            name="title"
                            value={this.state.activeItem.title}
                            onChange={this.handleChange}
                            placeholder="Enter Title" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">description</Label>
                            <Input
                            type="text"
                            name="description"
                            value={this.state.activeItem.description}
                            onChange={this.handleChange}
                            placeholder="Enter description" />
                        </FormGroup>
                        <FormGroup check>
                            <Label for="completed">
                            <Input
                            type="checkbox"
                            checked={completed}
                            name="completed"
                            value={this.state.activeItem.completed}
                            onChange={this.handleChange}
                             />
                             Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}


// export default Modal

