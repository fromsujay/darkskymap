import React from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Select, Slider, Icon, Tooltip, Affix } from 'antd';
import 'antd/dist/antd.css';
import "../stylesheet/addLocation.css";

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {

      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const dateFormat = 'DD/MM/YYYY';
      const Option = Select.Option;
      const { TextArea } = Input;
      const transparencyMarks = {
                    0: 'T1',
                    25: 'T2',
                    50: 'T3',
                    75: 'T4',
                    100: 'T5'
                  };

      const pollutionMarks = {
                    0: 'P1',
                    25: 'P2',
                    50: 'P3',
                    75: 'P4',
                    100: 'P5'
                  };

      const seeingMarks = {
        0: 'S1',
        25: 'S2',
        50: 'S3',
        75: 'S4',
        100: 'S5'
      };

      function formatterTransparency(value) {
        console.log('valeur', value)

        if (value == 0){
          return 'Très bonne'
        } else if (value == 25){
        return 'Bonne'
      } else if (value == 50){
        return 'Moyenne'
      } else if (value == 75){
        return 'Insatisfaisant'
      } else if (value == 100){
        return 'Mauvaise'
      }
    }

    function formatterPollution(value) {
      if (value == 0){
        return 'Très bonne'
      } else if (value == 25){
      return 'Bonne'
    } else if (value == 50){
      return 'Moyenne'
    } else if (value == 75){
      return 'Insatisfaisant'
    } else if (value == 100){
      return 'Mauvaise'
    }
  }

    function formatterSeeing(value) {
      if (value == 0){
        return 'Très bonne'
      } else if (value == 25){
      return 'Bonne'
    } else if (value == 50){
      return 'Moyenne'
    } else if (value == 75){
      return 'Insatisfaisant'
    } else if (value == 100){
      return 'Mauvaise'
    }
  }

      return (
        <Modal
          visible={visible}
          title="Ajouter un nouveau lieu d'observation"
          okText="Créer le lieu d'observation"
          cancelText="Retour"
          onCancel={onCancel}
          onOk={onCreate}
        >


          <Form className="textAddLocation" layout="vertical">

            <FormItem label="Nom du lieu">
              {getFieldDecorator('locationName', {
                rules: [{ required: true, message: 'Veuillez renseigner le nom du lieu' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="Localisation">
              {getFieldDecorator('locationCategory', {
                initialValue: 'generale',
              })(
                <Radio.Group>
                  <Radio value="generale">Générale</Radio>
                  <Radio value="gite">Gite</Radio>
                  <Radio value="observatoire">Observatoire</Radio>
                  <Radio value="observatoire&gite">Gite et Observatoire</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem
              label="Date d'observation">
              {getFieldDecorator('observationDate', {
                rules: [{ required: true, message: 'Veuillez renseigner la date de votre observation' }],
              })(
                <DatePicker format={dateFormat} />
              )}
            </FormItem>

            <FormItem label="Latitude">
              {getFieldDecorator('latitude', {
                rules: [{ required: true, message: 'Veuillez renseigner la latitude du lieu' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="Longitude">
              {getFieldDecorator('longitude', {
                rules: [{ required: true, message: 'Veuillez renseigner la longitude du lieu' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="Horizon Sud Dégagé">
              {getFieldDecorator('isSouthernHorizonClear', {
                rules: [
                  { required: true, message: "Veuillez renseigner quelle partie de l'horizon sud est dégagé" },
                ],
              })(
                <Select placeholder="Veuillez sélectionner votre réponse">
                  <Option value="Est à Ouest">Est à Ouest</Option>
                  <Option value="Est à Sud-Est">Est à Sud-Est</Option>
                  <Option value="Est à Sud">Est à Sud</Option>
                  <Option value="Sud-Est à Sud">Sud-Est à Sud</Option>
                  <Option value="Sud à Ouest">Sud à Ouest</Option>
                  <Option value="Sud-Est à Sud-Ouest">Sud-Est à Sud-Ouest</Option>
                  <Option value="Sud à Sud-Ouest">Sud à Sud-Ouest</Option>
                  <Option value="Sud-ouest à Ouest">Sud-ouest à Ouest</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="Échelle de Bortle">
              {getFieldDecorator('bortleScale', {
                rules: [
                  { required: true, message: "Veuillez renseigner l'état de l'observation" },
                ],
              })(
                <Select placeholder="Veuillez sélectionner votre réponse">
                  <Option value="C1 (Ciel excellent)">C1 (Ciel excellent)</Option>
                  <Option value="C2 (Ciel vraiment noir)">C2 (Ciel vraiment noir)</Option>
                  <Option value="C3 (Ciel rural)">C3 (Ciel rural)</Option>
                  <Option value="C4 (Transition rural-urbain)">C4 (Transition rural-urbain)</Option>
                  <Option value="C5 (Ciel péri-urbain)">C5 (Ciel péri-urbain)</Option>
                  <Option value="C6 (Ciel de banlieue)">C6 (Ciel de banlieue)</Option>
                  <Option value="C7 (Transition banlieue-ville)">C7 (Transition banlieue-ville))</Option>
                  <Option value="C8 (Ciel de ville)">C8 (Ciel de ville)</Option>
                  <Option value="C9 (Ciel de centre-ville)">C9 (Ciel de centre-ville)</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="Catégorie d'observation">
              {getFieldDecorator('observationCategory', {
                initialValue: 'Observation planétaire & lunaire uniquement',
              })(
                <Radio.Group>
                  <Radio value="Observation planétaire & lunaire uniquement">Observation planétaire & lunaire uniquement</Radio>
                  <Radio value="Observation du ciel profond">Observation du ciel profond</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label={(
              <span>Est-ce un compromis urbain ?&nbsp;
                <Tooltip title="Lieu d'observation adéquat en métropole">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}>
              {getFieldDecorator('urbanCompromise', {
                initialValue: 'true',
              })(
                <Radio.Group>
                  <Radio value="true">Oui</Radio>
                  <Radio value="false">Non</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="Transparence du ciel">
              <div className="icon-wrapper">
                <Icon style={{color:"grey"}}  type="smile-o" />
                {getFieldDecorator('transparency')(
                <Slider tipFormatter={formatterTransparency} step={null} marks={transparencyMarks} />
                )}
                <Icon style={{color:"grey"}} type="frown-o" />
              </div>
            </FormItem>


             <FormItem label="Pollution lumineuse">
                <div className="icon-wrapper">
                  <Icon style={{color:"grey"}}  type="smile-o" />
                  {getFieldDecorator('lightPollution')(
                  <Slider tipFormatter={formatterPollution} step={null} marks={pollutionMarks} />
                  )}
                  <Icon style={{color:"grey"}} type="frown-o" />
                </div>
            </FormItem>


            <FormItem label="Turbulence">
                <div className="icon-wrapper">
                  <Icon style={{color:"grey"}}  type="smile-o" />
                  {getFieldDecorator('seeing')(
                  <Slider tipFormatter={formatterSeeing} step={null} marks={seeingMarks}/>
                  )}
                  <Icon style={{color:"grey"}} type="frown-o" />
                </div>
            </FormItem>

            <FormItem label="Sky Quality Meter">
              {getFieldDecorator('skyQualityMeter')(<Input type="textarea" />)}
            </FormItem>

            <FormItem label="Facilité d'accès en voiture">
              {getFieldDecorator('easeOfAccessibilityByCar')(
                <Radio.Group>
                  <Radio value="true">Oui</Radio>
                  <Radio value="false">Non</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="Possibilité de stationnement">
              {getFieldDecorator('parkingAvailability')(
                <Radio.Group>
                  <Radio value="true">Oui</Radio>
                  <Radio value="false">Non</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="Courant électrique à disposition">
              {getFieldDecorator('powerSupplyAvailability')(
                <Radio.Group>
                  <Radio value="true">Oui</Radio>
                  <Radio value="false">Non</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="Informations complémentaires">
              {getFieldDecorator('additionalInformation')(<TextArea row={4} type="textarea" />)}
            </FormItem>

          </Form>
        </Modal>
      );
    }
  }
);

class AddLocation extends React.Component {
  state = {
    visible: false,
    values: null,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {

      if (err) {
        return;
      }
      console.log('Mon state values', values);
      console.log('Received values of form: ', values);


      if (values){
      fetch('http://localhost:3000/addlocation', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(values)
      })
      .then(function(response) {
      return response.json();
      })
      .then(function(data) {
      console.log(data);
      });
    }

      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
        <a style={{color: "white", marginLeft: "15px"}} onClick={this.showModal}>Ajouter un lieu</a>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default AddLocation
