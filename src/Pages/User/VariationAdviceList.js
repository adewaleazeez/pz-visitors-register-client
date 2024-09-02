import React, { Component } from "react";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import CustomModal from "../../Components/CustomModal";
import PDFVariationAdviceDocument from "./PDFVariationAdviceDocument";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

const variationReasonList = [
    { value: 0, label: 'A/PROM' },
    { value: 1, label: 'A/INCRE' }
];

const loanGrantedList = [
    { value: 0, label: 'No' },
    { value: 1, label: 'Yes' }
];

const statusOptions = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Approved' },
    { value: 2, label: 'Rejected' }
];

export default class VariationAdviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedRecord: null,
            modalOpen: false,
            pdfDocOpen: false,
            pdfContent: [],
            list: [],
            yearsOptions: [],
            staffCategorysOptions: [],
            staffLevelsOptions: [],
            staffStepsOptions: [],
            perPage: 5,
            page: 0,
            pages: 0,
            selectedStatus: 0,
            selectedVariationReason: 0,
            selectedLoanGranted: 0,
            selectedOldYear: 0,
            selectedNewYear: 0,
            selectedOldStaffCategory: 0,
            selectedNewStaffCategory: 0,
            selectedOldStaffLevel: 0,
            selectedNewStaffLevel: 0,
            selectedOldStaffStep: 0,
            selectedNewStaffStep: 0,
        };
        this.handleVariationReasonChange = this.handleVariationReasonChange.bind(this);
        this.handleLoanGrantedChange = this.handleLoanGrantedChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    };

    componentDidMount() {
        this.getYears();
        this.getStaffCategorys();
        this.getStaffLevels();
        this.getStaffSteps();
        this.getVariationAdvice();
    };

    componentWillUnmount() {

    };

    handleVariationReasonChange(e) {
        this.setState({ selectedVariationReason: e.value });
    }

    handleLoanGrantedChange(e) {
        this.setState({ selectedLoanGranted: e.value });
    }

    handleStatusChange(e) {
        this.setState({ selectedStatus: e.value });
    }

    handleYearChange = (e, opt) => {
        let index = this.state.yearsOptions.findIndex(year => year.label == e.label);
        (opt.props.name === "oldScaleYearEdit") ? this.setState({ selectedOldYear: index }) : this.setState({ selectedNewYear: index });
    }

    handleStaffCategoryChange = (e, opt) => {
        let index = this.state.staffCategorysOptions.findIndex(category => category.label == e.label);
        (opt.props.name === "oldStaffCategoryEdit") ? this.setState({ selectedOldStaffCategory: index }) : this.setState({ selectedNewStaffCategory: index });
    }

    handleStaffLevelChange = (e, opt) => {
        let index = this.state.staffLevelsOptions.findIndex(level => level.label == e.label);
        (opt.props.name === "oldStaffLevelEdit") ? this.setState({ selectedOldStaffLevel: index }) : this.setState({ selectedNewStaffLevel: index });
    }

    handleStaffStepChange = (e, opt) => {
        let index = this.state.staffStepsOptions.findIndex(step => step.label == e.label);
        (opt.props.name === "oldStaffStepEdit") ? this.setState({ selectedOldStaffStep: index }) : this.setState({ selectedNewStaffStep: index });
    }


    editForm = () => {
        { localStorage.setItem('voucherid', this.state.selectedRecord.id); }
        return (
            <form className="form-validate is-alter">
                <div className="card card-bordered">
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Staff No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="hidden"
                                                id="idEdit"
                                                name="idEdit"
                                                ref="idEdit"
                                                className="form-control"
                                                required
                                                defaultValue={this.state.selectedRecord.id}
                                            />
                                            <input
                                                type="hidden"
                                                id="staffIdEdit"
                                                name="staffIdEdit"
                                                ref="staffIdEdit"
                                                className="form-control"
                                                required
                                                defaultValue={this.state.selectedRecord.staffId}
                                            />
                                            <input
                                                type="text"
                                                id="staffNoEdit"
                                                name="staffNoEdit"
                                                ref="staffNoEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.staffNo}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Staff Name<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="staffNameEdit"
                                                name="staffNameEdit"
                                                ref="staffNameEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.staffName}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Rank<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="rankEdit"
                                                name="rankEdit"
                                                ref="rankEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.rank}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">File No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="fileNoEdit"
                                                name="fileNoEdit"
                                                ref="fileNoEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.fileNo}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Ippis (Oracle) No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="ippisNoEdit"
                                                name="ippisNoEdit"
                                                ref="ippisNoEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.ippisNo}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Scale Year<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldScaleYearEdit"
                                                name="oldScaleYearEdit"
                                                ref="oldScaleYearEdit"
                                                className="form-control"
                                                options={this.state.yearsOptions}
                                                onChange={e => this.handleYearChange(e, this.refs.oldScaleYearEdit)}
                                                defaultValue={this.state.yearsOptions[this.state.selectedRecord.oldScaleYear -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Category<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffCategoryEdit"
                                                name="oldStaffCategoryEdit"
                                                ref="oldStaffCategoryEdit"
                                                className="form-control"
                                                options={this.state.staffCategorysOptions}
                                                onChange={e => this.handleStaffCategoryChange(e, this.refs.oldStaffCategoryEdit)}
                                                defaultValue={this.state.staffCategorysOptions[this.state.selectedRecord.oldStaffCategory -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Level<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffLevelEdit"
                                                name="oldStaffLevelEdit"
                                                ref="oldStaffLevelEdit"
                                                className="form-control"
                                                options={this.state.staffLevelsOptions}
                                                onChange={e => this.handleStaffLevelChange(e, this.refs.oldStaffLevelEdit)}
                                                defaultValue={this.state.staffLevelsOptions[this.state.selectedRecord.oldStaffLevel -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Step<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffStepEdit"
                                                name="oldStaffStepEdit"
                                                ref="oldStaffStepEdit"
                                                className="form-control"
                                                options={this.state.staffStepsOptions}
                                                onChange={e => this.handleStaffStepChange(e, this.refs.oldStaffStepEdit)}
                                                defaultValue={this.state.staffStepsOptions[this.state.selectedRecord.oldStaffStep -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Salary<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="oldStaffSalaryEdit"
                                                name="oldStaffSalaryEdit"
                                                ref="oldStaffSalaryEdit"
                                                className="form-control"
                                                readOnly
                                                disabled
                                                defaultValue={this.state.selectedRecord.oldStaffSalary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Scale Year<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newScaleYearEdit"
                                                name="newScaleYearEdit"
                                                ref="newScaleYearEdit"
                                                className="form-control"
                                                options={this.state.yearsOptions}
                                                onChange={e => this.handleYearChange(e, this.refs.newScaleYearEdit)}
                                                defaultValue={this.state.yearsOptions[this.state.selectedRecord.newScaleYear -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Category<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffCategoryEdit"
                                                name="newStaffCategoryEdit"
                                                ref="newStaffCategoryEdit"
                                                className="form-control"
                                                options={this.state.staffCategorysOptions}
                                                onChange={e => this.handleStaffCategoryChange(e, this.refs.newStaffCategoryEdit)}
                                                defaultValue={this.state.staffCategorysOptions[this.state.selectedRecord.newStaffCategory -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Level<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffLevelEdit"
                                                name="newStaffLevelEdit"
                                                ref="newStaffLevelEdit"
                                                className="form-control"
                                                options={this.state.staffLevelsOptions}
                                                onChange={e => this.handleStaffLevelChange(e, this.refs.newStaffLevelEdit)}
                                                defaultValue={this.state.staffLevelsOptions[this.state.selectedRecord.newStaffLevel -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Step<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffStepEdit"
                                                name="newStaffStepEdit"
                                                ref="newStaffStepEdit"
                                                className="form-control"
                                                options={this.state.staffStepsOptions}
                                                onChange={e => this.handleStaffStepChange(e, this.refs.newStaffStepEdit)}
                                                defaultValue={this.state.staffStepsOptions[this.state.selectedRecord.newStaffStep -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Salary<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="newStaffSalaryEdit"
                                                name="newStaffSalaryEdit"
                                                ref="newStaffSalaryEdit"
                                                readOnly
                                                disabled
                                                defaultValue={this.state.selectedRecord.newStaffSalary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Amount Variation<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="variationAmountEdit"
                                                name="variationAmountEdit"
                                                ref="variationAmountEdit"
                                                readOnly
                                                disabled
                                                defaultValue={this.state.selectedRecord.variationAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }
                                                onBlur={() => this.getAmountInWords('edit')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Effective Date<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="date"
                                                ref="effectiveDateEdit"
                                                id="effectiveDateEdit"
                                                name="effetiveDateEdit"
                                                defaultValue={this.state.selectedRecord.effectiveDate}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Authority Gazzete Notification<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="authorityGazzeteNotificationEdit"
                                                name="authorityGazzeteNotificationEdit"
                                                ref="authorityGazzeteNotificationEdit"
                                                defaultValue={this.state.selectedRecord.authorityGazzeteNotification}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Wheather Loan Granted<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="loanGrantedEdit"
                                                name="loanGrantedEdit"
                                                ref="loanGrantedEdit"
                                                className="form-control"
                                                defaultValue={loanGrantedList[this.state.selectedRecord.loanGranted]}
                                                options={loanGrantedList}
                                                onChange={this.handleLoanGrantedChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Reason for Variation<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="variationReasonEdit"
                                                name="variationReasonEdit"
                                                ref="variationReasonEdit"
                                                className="form-control"
                                                defaultValue={variationReasonList[this.state.selectedRecord.variationReason]}
                                                options={variationReasonList}
                                                onChange={this.handleVariationReasonChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Remarks<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <textarea
                                                className="form-control"
                                                id="remarksEdit"
                                                name="remarksEdit"
                                                ref="remarksEdit"
                                                defaultValue={this.state.selectedRecord.remarks}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Status<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="statusEdit"
                                                name="statusEdit"
                                                ref="statusEdit"
                                                className="form-control"
                                                defaultValue={statusOptions[this.state.selectedRecord.status]}
                                                options={statusOptions}
                                                onChange={this.handleStatusChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"><div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <div>
                                                <button
                                                    onClick={() => this.callUpdateVariationAdvice()}
                                                    type="button"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    Update Variation Advice
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"><div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <div>
                                                <button
                                                    onClick={() => this.callDeleteVariationAdvice()}
                                                    type="button"
                                                    className="btn btn-lg btn-danger"
                                                >
                                                    Delete Variation Advice
                                                </button>

                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="nk-tb-list">
                                        <div className="nk-tb-item nk-tb-head">
                                            <div className="nk-tb-col tb-col-lg">
                                                {/* <VariationAdviceDocs /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ paddingBottom: "200px" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        );
    };

    newForm() {
        {this.state.selectedOldYear = parseInt(localStorage.getItem('oldScaleYear')) -1}
        {this.state.selectedOldStaffCategory = parseInt(localStorage.getItem('oldStaffCategory')) -1}
        {this.state.selectedOldStaffLevel = parseInt(localStorage.getItem('oldStaffLevel')) -1}
        {this.state.selectedOldStaffStep = parseInt(localStorage.getItem('oldStaffStep')) -1}
        {this.state.selectedNewYear = parseInt(localStorage.getItem('current_year_id')) -1}
        return (
            <form className="form-validate is-alter">
                <div className="card card-bordered">
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Staff No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="hidden"
                                                id="staffId"
                                                name="staffId"
                                                ref="staffId"
                                                defaultValue={localStorage.getItem('staffid')}
                                            />
                                            <input
                                                type="text"
                                                id="staffNo"
                                                name="staffNo"
                                                ref="staffNo"
                                                className="form-control"
                                                defaultValue={localStorage.getItem('staffNo')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Staff Name<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="staffName"
                                                name="staffName"
                                                ref="staffName"
                                                className="form-control"
                                                defaultValue={localStorage.getItem('staffName')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Rank<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="rank"
                                                name="rank"
                                                ref="rank"
                                                className="form-control"
                                                defaultValue={localStorage.getItem('rank')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">File No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="fileNo"
                                                name="fileNo"
                                                ref="fileNo"
                                                className="form-control"
                                                defaultValue={localStorage.getItem('fileNo')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Ippis (Oracle) No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="ippisNo"
                                                name="ippisNo"
                                                ref="ippisNo"
                                                className="form-control"
                                                defaultValue={localStorage.getItem('ippisNo')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Scale Year<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldScaleYear"
                                                name="oldScaleYear"
                                                ref="oldScaleYear"
                                                className="form-control"
                                                options={this.state.yearsOptions}
                                                onChange={e => this.handleYearChange(e, this.refs.oldScaleYear)}
                                                defaultValue={this.state.yearsOptions[parseInt(localStorage.getItem('oldScaleYear')) -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Category<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffCategory"
                                                name="oldStaffCategory"
                                                ref="oldStaffCategory"
                                                className="form-control"
                                                options={this.state.staffCategorysOptions}
                                                onChange={e => this.handleStaffCategoryChange(e, this.refs.oldStaffCategory)}
                                                defaultValue={this.state.staffCategorysOptions[parseInt(localStorage.getItem('oldStaffCategory')) -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Level<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffLevel"
                                                name="oldStaffLevel"
                                                ref="oldStaffLevel"
                                                className="form-control"
                                                options={this.state.staffLevelsOptions}
                                                onChange={e => this.handleStaffLevelChange(e, this.refs.oldStaffLevel)}
                                                defaultValue={this.state.staffLevelsOptions[parseInt(localStorage.getItem('oldStaffLevel')) -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Step<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffStep"
                                                name="oldStaffStep"
                                                ref="oldStaffStep"
                                                className="form-control"
                                                options={this.state.staffStepsOptions}
                                                onChange={e => this.handleStaffStepChange(e, this.refs.oldStaffStep)}
                                                defaultValue={this.state.staffStepsOptions[parseInt(localStorage.getItem('oldStaffStep')) -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Salary<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="oldStaffSalary"
                                                name="oldStaffSalary"
                                                ref="oldStaffSalary"
                                                className="form-control"
                                                readOnly
                                                disabled
                                                defaultValue={parseFloat(localStorage.getItem('oldStaffSalary')).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Scale Year<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newScaleYear"
                                                name="newScaleYear"
                                                ref="newScaleYear"
                                                className="form-control"
                                                options={this.state.yearsOptions}
                                                onChange={e => this.handleYearChange(e, this.refs.newScaleYear)}
                                                defaultValue={this.state.yearsOptions[parseInt(localStorage.getItem('current_year_id')) -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Category<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffCategory"
                                                name="newStaffCategory"
                                                ref="newStaffCategory"
                                                className="form-control"
                                                options={this.state.staffCategorysOptions}
                                                onChange={e => this.handleStaffCategoryChange(e, this.refs.newStaffCategory)}
                                                defaultValue={this.state.staffCategorysOptions[parseInt(localStorage.getItem('oldStaffCategory')) -1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Level<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffLevel"
                                                name="newStaffLevel"
                                                ref="newStaffLevel"
                                                className="form-control"
                                                options={this.state.staffLevelsOptions}
                                                onChange={e => this.handleStaffLevelChange(e, this.refs.newStaffLevel)}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Step<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffStep"
                                                name="newStaffStep"
                                                ref="newStaffStep"
                                                className="form-control"
                                                options={this.state.staffStepsOptions}
                                                onChange={e => this.handleStaffStepChange(e, this.refs.newStaffStep)}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Salary<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="newStaffSalary"
                                                name="newStaffSalary"
                                                ref="newStaffSalary"
                                                readOnly
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Amount Variation<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="variationAmount"
                                                name="variationAmount"
                                                ref="variationAmount"
                                                readOnly
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Authority Gazzete Notification<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="authorityGazzeteNotification"
                                                name="authorityGazzeteNotification"
                                                ref="authorityGazzeteNotification"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Wheather Loan Granted<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="loanGranted"
                                                name="loanGranted"
                                                ref="loanGranted"
                                                className="form-control"
                                                options={loanGrantedList}
                                                onChange={this.handleLoanGrantedChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Reason for Variation<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="variationReason"
                                                name="variationReason"
                                                ref="variationReason"
                                                className="form-control"
                                                options={variationReasonList}
                                                onChange={this.handleVariationReasonChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Status<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="status"
                                                name="status"
                                                ref="status"
                                                className="form-control"
                                                options={statusOptions}
                                                onChange={this.handleStatusChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Effective Date<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="date"
                                                id="effectiveDate"
                                                name="effectiveDate"
                                                ref="effectiveDate"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Remarks</label>
                                        <div className="form-control-wrap">
                                            <textarea
                                                className="form-control"
                                                id="remarks"
                                                name="remarks"
                                                ref="remarks"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"></label>
                                        <div className="form-control-wrap">
                                            <button
                                                onClick={() => this.callCreateVariationAdvice()}
                                                type="button"
                                                className="btn btn-lg btn-primary"
                                            >
                                                Add New Variation Advice
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                    {/* <div style={{ paddingBottom: "200px" }}></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        );
    };

    getYears = async () => {
        await UsersDataService.getYears()
            .then(res => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.year
                }))
                this.setState({ yearsOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    getStaffCategorys = async () => {
        await UsersDataService.getStaffCategorys()
            .then(res => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.category
                }))
                this.setState({ staffCategorysOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    getStaffLevels = async () => {
        await UsersDataService.getStaffLevels()
            .then(res => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.level
                }))
                this.setState({ staffLevelsOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    getStaffSteps = async () => {
        await UsersDataService.getStaffSteps()
            .then(res => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.step
                }))
                this.setState({ staffStepsOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    callCreateVariationAdvice = async () => {
        this.setState({ loading: true });
        let errormessage = "";
        if (this.refs.effectiveDate.value == "" || this.refs.effectiveDate.value == undefined) {
            errormessage = <div>{errormessage}<div>Effective Date can not be blank<br /></div></div>;
        }
        if (variationReasonList[this.state.selectedVariationReason] == undefined) {
            errormessage = <div>{errormessage}<div>Variation Reason can not be blank<br /></div></div>;
        }
        if (loanGrantedList[this.state.selectedLoanGranted] == undefined) {
            errormessage = <div>{errormessage}<div>Loan Granted Status can not be blank<br /></div></div>;
        }
        if (this.state.yearsOptions[this.state.selectedOldYear] == undefined) {
            errormessage = <div>{errormessage}<div>Old Scale Year can not be blank<br /></div></div>;
        }
        if (this.state.yearsOptions[this.state.selectedNewYear] == undefined) {
            errormessage = <div>{errormessage}<div>New Scale Year can not be blank<br /></div></div>;
        }
        if (this.state.staffCategorysOptions[this.state.selectedOldStaffCategory] == undefined) {
            errormessage = <div>{errormessage}<div>Old Staff Category can not be blank<br /></div></div>;
        }
        if (this.state.staffCategorysOptions[this.state.selectedNewStaffCategory] == undefined) {
            errormessage = <div>{errormessage}<div>New Staff Category can not be blank<br /></div></div>;
        }
        if (this.state.staffLevelsOptions[this.state.selectedOldStaffLevel] == undefined) {
            errormessage = <div>{errormessage}<div>Old Staff Level can not be blank<br /></div></div>;
        }
        if (this.state.staffLevelsOptions[this.state.selectedNewStaffLevel] == undefined) {
            errormessage = <div>{errormessage}<div>New Staff Level can not be blank<br /></div></div>;
        }
        if (this.state.staffStepsOptions[this.state.selectedOldStaffStep] == undefined) {
            errormessage = <div>{errormessage}<div>Old Staff Step can not be blank<br /></div></div>;
        }
        if (this.state.staffStepsOptions[this.state.selectedNewStaffStep] == undefined) {
            errormessage = <div>{errormessage}<div>New Staff Step can not be blank<br /></div></div>;
        }
        if (statusOptions[this.state.selectedStatus] == undefined) {
            errormessage = <div>{errormessage}<div>Status can not be blank<br /></div></div>;
        }

        if (errormessage != "") {
            errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
            Toastr("error", errormessage);
            return true;
        }
        
        var data = {
            staffId: this.refs.staffId.value,
            oldScaleYear: this.state.yearsOptions[this.state.selectedOldYear].value.toString(),
            oldStaffCategory: this.state.staffCategorysOptions[this.state.selectedOldStaffCategory].value.toString(),
            oldStaffLevel: this.state.staffLevelsOptions[this.state.selectedOldStaffLevel].value.toString(),
            oldStaffStep: this.state.staffStepsOptions[this.state.selectedOldStaffStep].value.toString(),
            // oldStaffSalary: this.refs.oldStaffSalary.value,
            newScaleYear: this.state.yearsOptions[this.state.selectedNewYear].value.toString(),
            newStaffCategory: this.state.staffCategorysOptions[this.state.selectedNewStaffCategory].value.toString(),
            newStaffLevel: this.state.staffLevelsOptions[this.state.selectedNewStaffLevel].value.toString(),
            newStaffStep: this.state.staffStepsOptions[this.state.selectedNewStaffStep].value.toString(),
            // newStaffSalary: this.refs.newStaffSalary.value,
            // variationAmount: this.refs.variationAmount.value,
            effectiveDate: this.refs.effectiveDate.value,
            authorityGazzeteNotification: this.refs.authorityGazzeteNotification.value,
            variationReason: this.state.selectedVariationReason.toString(),
            loanGranted: this.state.selectedLoanGranted.toString(),
            status: this.state.selectedStatus.toString(),
            remarks: this.refs.remarks.value,
            userId: localStorage.getItem('userid'),
            unitId: localStorage.getItem('unitid'),
        };

        await UsersDataService.createVariationAdvice(data)
            .then(response => {
                if (response.toString().includes("already exists")) {
                    Toastr(
                        "error",
                        response
                    );
                    return true;
                } else {
                    Toastr(
                        "info",
                        "Variation Advice creation is successful...."
                    );
                }
                this.setState({ modalOpen: false });
                this.getVariationAdvice();
            })
            .catch(e => {
                Toastr(
                    "error",
                    "Error creating Variation Advice"
                );
                this.setState({ loading: false });
            });

    };

    async callUpdateVariationAdvice() {
        this.setState({ loading: true });
        let errormessage = "";
        if (this.refs.effectiveDateEdit.value == "" || this.refs.effectiveDateEdit.value == undefined) {
            errormessage = <div>{errormessage}<div>Effective Date can not be blank<br /></div></div>;
        }
        if (variationReasonList[this.state.selectedVariationReason] == undefined) {
            errormessage = <div>{errormessage}<div>Variation Reason can not be blank<br /></div></div>;
        }
        if (loanGrantedList[this.state.selectedLoanGranted] == undefined) {
            errormessage = <div>{errormessage}<div>Loan Granted Status can not be blank<br /></div></div>;
        }
        if (this.state.yearsOptions[this.state.selectedOldYear] == undefined) {
            errormessage = <div>{errormessage}<div>Old Scale Year can not be blank<br /></div></div>;
        }
        if (this.state.yearsOptions[this.state.selectedNewYear] == undefined) {
            errormessage = <div>{errormessage}<div>New Scale Year can not be blank<br /></div></div>;
        }
        if (this.state.staffCategorysOptions[this.state.selectedOldStaffCategory] == undefined) {
            errormessage = <div>{errormessage}<div>Old Staff Category can not be blank<br /></div></div>;
        }
        if (this.state.staffCategorysOptions[this.state.selectedNewStaffCategory] == undefined) {
            errormessage = <div>{errormessage}<div>New Staff Category can not be blank<br /></div></div>;
        }
        if (this.state.staffLevelsOptions[this.state.selectedOldStaffLevel] == undefined) {
            errormessage = <div>{errormessage}<div>Old Staff Level can not be blank<br /></div></div>;
        }
        if (this.state.staffLevelsOptions[this.state.selectedNewStaffLevel] == undefined) {
            errormessage = <div>{errormessage}<div>New Staff Level can not be blank<br /></div></div>;
        }
        if (this.state.staffStepsOptions[this.state.selectedOldStaffStep] == undefined) {
            errormessage = <div>{errormessage}<div>Old Staff Step can not be blank<br /></div></div>;
        }
        if (this.state.staffStepsOptions[this.state.selectedNewStaffStep] == undefined) {
            errormessage = <div>{errormessage}<div>New Staff Step can not be blank<br /></div></div>;
        }
        if (statusOptions[this.state.selectedStatus] == undefined) {
            errormessage = <div>{errormessage}<div>Status can not be blank<br /></div></div>;
        }

        if (errormessage != "") {
            errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
            Toastr("error", errormessage);
            return true;
        }

        var data = {
            id: this.refs.idEdit.value,
            staffId: this.refs.staffIdEdit.value,
            staffNo: this.refs.staffNoEdit.value,
            oldScaleYear: this.state.yearsOptions[this.state.selectedOldYear].value.toString(),
            oldStaffCategory: this.state.staffCategorysOptions[this.state.selectedOldStaffCategory].value.toString(),
            oldStaffLevel: this.state.staffLevelsOptions[this.state.selectedOldStaffLevel].value.toString(),
            oldStaffStep: this.state.staffStepsOptions[this.state.selectedOldStaffStep].value.toString(),
            oldStaffSalary: this.refs.oldStaffSalaryEdit.value.replace(/,/g, ""),
            newScaleYear: this.state.yearsOptions[this.state.selectedNewYear].value.toString(),
            newStaffCategory: this.state.staffCategorysOptions[this.state.selectedNewStaffCategory].value.toString(),
            newStaffLevel: this.state.staffLevelsOptions[this.state.selectedNewStaffLevel].value.toString(),
            newStaffStep: this.state.staffStepsOptions[this.state.selectedNewStaffStep].value.toString(),
            newStaffSalary: this.refs.newStaffSalaryEdit.value.replace(/,/g, ""),
            variationAmount: this.refs.variationAmountEdit.value.replace(/,/g, ""),
            effectiveDate: this.refs.effectiveDateEdit.value,
            authorityGazzeteNotification: this.refs.authorityGazzeteNotificationEdit.value,
            variationReason: this.state.selectedVariationReason.toString(),
            loanGranted: this.state.selectedLoanGranted.toString(),
            status: this.state.selectedStatus.toString(),
            remarks: this.refs.remarksEdit.value,
            userId: localStorage.getItem('userid'),
            unitId: localStorage.getItem('unitid'),
        };
        
        await UsersDataService.updateVariationAdvice(data)
            .then(response => {
                if (response.status == 200 && response.data.message.toString().includes("successfully")){
                Toastr(
                    "info",
                    response.data.message
                );
                } else if (response.data.message.toString().includes("already approved") || response.data.message.toString().includes("already queried")) {
                Toastr(
                    "error",
                    response.data.message
                );
                return true;
                }
                this.setState({ modalOpen: false});
                this.getVariationAdvice();
            })
            .catch(() => {
                Toastr(
                "error",
                "Error updating voucher"
                );
                this.setState({ loading: false });
            });
            
        };

    callDeleteVariationAdvice = async () => {
        this.setState({ loading: true });
        if (this.refs.VariationAdviceListEdit.value == "") {
            Toastr(
                "error",
                "Invalid Voucher Criteria"
            );
            return true;
        }
        var data = {
            id: this.refs.idEdit.value,
            VariationAdviceList: this.refs.VariationAdviceListEdit.value,
            voucherTypeId: localStorage.getItem('voucherTypeId')
        };
        await UsersDataService.deleteVariationAdviceList(data)
            .then(response => {
                if (typeof (response) !== "object") {
                    if (response.toString().includes("Error")) {
                        Toastr("error", response);
                        return true;
                    }
                } else {
                    Toastr(
                        "info",
                        "Voucher Criteria delete is successful...."
                    );
                }
                this.setState({ modalOpen: false });
                this.getVariationAdvice();
            })
            .catch(e => {
                Toastr(
                    "error",
                    "Error deleting voucher criteria "
                );
                this.setState({ loading: false });
            });

    };

    getVariationAdvice = async () => {
        var data = {
            staffId: localStorage.getItem('staffid'),
        };
        await UsersDataService.getVariationAdvice(data)
            .then(res => {
                const { perPage } = this.state;
                const list = res.data;
                /*let lent = list.length;
                if(lent == 0){
                  this.setState({ bPadding: "270px" });
                } else if(lent == 1){
                  this.setState({ bPadding: "220px" });
                } else if(lent == 2){
                  this.setState({ bPadding: "160px" });
                } else if(lent == 3){
                  this.setState({ bPadding: "110px" });
                } else if(lent == 4){
                  this.setState({ bPadding: "50px" });
                } else{
                  this.setState({ bPadding: "0px" });
                }*/
                this.setState({
                    list,
                    pages: Math.ceil(list.length / perPage)
                });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({ page })
    };

    handleKeyPress = (e) => {
        var key = e.key;
        if (key == "Enter") {
            this.getVariationAdviceListByOption();
        }

    };
    
  callGetOldVariationAdvice   = async () => {
        var data = {
            staffId: localStorage.getItem('staffid'),
        };
        await UsersDataService.getOldVariationAdvice(data)
            .then(res => {
				console.log(res.data[0].newScaleYear)
                console.log(res.data[0].newStaffCategory)
                console.log(res.data[0].newStaffLevel)
                console.log(res.data[0].newStaffStep)
                console.log(res.data[0].newStaffSalary)
                this.refs.oldScaleYearEdit.value = res.data[0].newScaleYear;
                this.refs.oldStaffCategoryEdit.value = res.data[0].newStaffCategory;
                this.refs.oldStaffLevelEdit.value = res.data[0].newStaffLevel;
                this.refs.oldStaffStepEdit.value = res.data[0].newStaffStep;
                this.refs.oldStaffSalaryEdit.value = res.data[0].newStaffSalary;
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    getVariationAdviceListByOption = async () => {
        this.setState({ loading: true });
        if (this.refs.searchStr.value == "") {
            Toastr(
                "error",
                "Invalid search text"
            );
            return true;
        }
        var data = {
            searchStr: this.refs.searchStr.value,
            voucherAuditId: localStorage.getItem('voucherid'),
        };
        await UsersDataService.getVariationAdviceListByOption(data)
            .then(res => {
                const { perPage } = this.state;
                const list = res.data;
                /*let lent = list.length;
                if(lent == 0){
                  this.setState({ bPadding: "270px" });
                } else if(lent == 1){
                  this.setState({ bPadding: "220px" });
                } else if(lent == 2){
                  this.setState({ bPadding: "160px" });
                } else if(lent == 3){
                  this.setState({ bPadding: "110px" });
                } else if(lent == 4){
                  this.setState({ bPadding: "50px" });
                } else{
                  this.setState({ bPadding: "0px" });
                }*/
                this.setState({
                    list,
                    pages: Math.ceil(list.length / perPage)
                });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    viewPDFDoc = async () => {
        this.setState({ loading: true });
        var data = {
            id: localStorage.getItem('staffid')
        };
        await UsersDataService.getVariationAdviceById(data)
            .then(res => {
                const list = res.data;
                this.setState({ pdfContent: list });
                this.setState({ pdfDocOpen: true });
            })
            .catch(() => {
                this.setState({ loading: false });
            });

        //setTimeout(() => {}, 10 00);
    }

    render() {
        const { page, perPage, pages, list } = this.state;
        let items = list.slice(page * perPage, (page + 1) * perPage);
        let sno = 0;
        let variations = items.map(item => {
            let date = new Date(item.voucherDate);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            let newdate = year + '-' + month + '-' + dt;
            sno++;
            return (
                <div className="nk-tb-item" key={item.id}>
                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-sno">{sno}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-refNo">{item.staffNo}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-auditNo">{item.staffName}</span>
                    </div>

                    {/* <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.rank}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.fileNo}</span>
                    </div> */}

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.ippisNo}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.oldStaffSalary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.newStaffSalary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.variationAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.effectiveDate}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.statusDesc}</span>
                    </div>

                    {/* <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.userName}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.unitName}</span>
                    </div> */}

                    <div className="nk-tb-col tb-col-md">
                        <ul className="tb-edit">
                            <li className="tb-edit">
                                <div>
                                    <button type="button" className="btn btn-icon tb-edit">
                                        <em
                                            onClick={() =>
                                                this.setState({
                                                    modalOpen: true,
                                                    selectedRecord: {
                                                        id: item.id,
                                                        staffId: item.staffId,
                                                        staffNo: item.staffNo,
                                                        staffName: item.staffName,
                                                        rank: item.rank,
                                                        fileNo: item.fileNo,
                                                        ippisNo: item.ippisNo,
                                                        oldScaleYear: item.oldScaleYear.toString(),
                                                        oldStaffCategory: item.oldStaffCategory,
                                                        oldStaffLevel: item.oldStaffLevel,
                                                        oldStaffStep: item.oldStaffStep,
                                                        oldStaffSalary: item.oldStaffSalary,
                                                        newScaleYear: item.newScaleYear,
                                                        newStaffCategory: item.newStaffCategory,
                                                        newStaffLevel: item.newStaffLevel,
                                                        newStaffStep: item.newStaffStep,
                                                        newStaffSalary: item.newStaffSalary,
                                                        variationAmount: item.variationAmount,
                                                        effectiveDate: item.effectiveDate,
                                                        authorityGazzeteNotification: item.authorityGazzeteNotification,
                                                        loanGranted: item.loanGranted,
                                                        variationReason: item.variationReason,
                                                        remarks: item.remarks,
                                                        status: item.status,
                                                        userId: item.userId,
                                                        title: "Edit"
                                                    },
                                                })
                                            }
                                            className="icon ni ni-pen"
                                            title="Edit Record"
                                        ></em>
                                    </button>
                                    {/* <button type="button" className="btn btn-icon tb-delete">
                                        <em
                                            onClick={() =>
                                                this.setState({
                                                    modalOpen: true,
                                                    selectedRecord: {
                                                        id: item.id,
                                                        staffId: item.staffId,
                                                        staffNo: item.staffNo,
                                                        staffName: item.staffName,
                                                        rank: item.rank,
                                                        fileNo: item.fileNo,
                                                        ippisNo: item.ippisNo,
                                                        oldScaleYear: item.oldScaleYear,
                                                        oldStaffCategory: item.oldStaffCategory,
                                                        oldStaffLevel: item.oldStaffLevel,
                                                        oldStaffStep: item.oldStaffStep,
                                                        oldStaffSalary: item.oldStaffSalary,
                                                        newScaleYear: item.newScaleYear,
                                                        newStaffCategory: item.newStaffCategory,
                                                        newStaffLevel: item.newStaffLevel,
                                                        newStaffStep: item.newStaffStep,
                                                        newStaffSalary: item.newStaffSalary,
                                                        variationAmount: item.variationAmount,
                                                        effectiveDate: item.effectiveDate,
                                                        authorityGazzeteNotification: item.authorityGazzeteNotification,
                                                        loanGranted: item.loanGranted,
                                                        variationReason: item.variationReason,
                                                        remarks: item.remarks,
                                                        userId: item.userId,
                                                        title: "Delete"
                                                    },
                                                })
                                            }
                                            className="icon ni ni-trash"
                                            title="Delete Record"
                                        ></em>
                                    </button> */}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            )
        }) || '';

        return (

            <div>

                <div className="toggle-wrap nk-block-tools-toggle">
                    <a
                        href="#"
                        className="btn btn-icon btn-trigger toggle-expand mr-n1"
                        data-target="pageMenu"
                    >
                        <em className="icon ni ni-more-v" />
                    </a>
                    <div className="toggle-expand-content" data-content="pageMenu">
                        <ul className="nk-block-tools g-3">
                            <li>
                                <div className="form-control-wrap">
                                    {/* <div className="form-icon form-icon-right">
                                        <em className="icon ni ni-search" />
                                    </div> */}
                                    <h3 className="form-label" style={{ paddingRight: "400px", fontSize: 23, fontWeight: "bolder" }}>Variation List</h3>
                                </div>
                            </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <li>
                                <div className="form-control-wrap">
                                    <div className="form-icon form-icon-right">
                                        <em className="icon ni ni-search" />
                                    </div>
                                    <input
                                        type="text"
                                        onKeyPress={(e) => this.handleKeyPress(e)}
                                        id="searchStr"
                                        name="searchStr"
                                        ref="searchStr"
                                        className="form-control"
                                        placeholder="Search"
                                    />
                                </div>
                            </li> */}
                            <li className="nk-block-tools-opt">
                                {/* <a
                                    href="#"
                                    className="toggle btn btn-icon btn-primary d-md-none"
                                >
                                    <em className="icon ni ni-plus" />
                                </a>
                                <button
                                    type="button"
                                    // onClick={() => this.getVariationAdvicesByOption()}
                                    className="toggle btn btn-primary d-none d-md-inline-flex"
                                >
                                    <em className="icon ni ni-search" />
                                    <span>Search</span>
                                </button>&nbsp;&nbsp;
                                <button
                                    type="button"
                                    // onClick={() => this.getVariationAdvices()}
                                    className="toggle btn btn-primary d-none d-md-inline-flex"
                                >
                                    <em className="icon ni ni-list" />
                                    <span>List All</span>
                                </button>&nbsp;&nbsp; */}
                                <button
                                    type="button"
                                    onClick={() =>  this.setState({ modalOpen: true, selectedRecord: false })}
                                    className="toggle btn btn-primary d-none d-md-inline-flex"
                                >
                                    <em className="icon ni ni-plus" />
                                    <span>Add New Variation Advice</span>
                                </button>&nbsp;&nbsp;
                                <button
                                    type="button"
                                    onClick={() => this.viewPDFDoc()}
                                    className="toggle btn btn-primary d-none d-md-inline-flex"
                                >
                                    <em className="icon ni ni-plus" />
                                    <span>Print Variation Advice</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <br />


                <CustomModal
                    title={
                        this.state.selectedRecord
                            ? (this.state.selectedRecord.title == "Edit" ? "Edit Variation Advice" : "Delete Variation Advice") : "New Variation Advice"
                    }
                    content={this.state.selectedRecord ? this.editForm() : this.newForm()}
                    isVisible={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false })}
                    bigForm={true}
                />
                <PDFVariationAdviceDocument
                    title={this.state.docTitle}
                    content={this.state.pdfContent}
                    isVisible={this.state.pdfDocOpen}
                    onClose={() => this.setState({ pdfDocOpen: false })}
                />
                <div className="card card-bordered">
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>S/No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-sm">
                                        <span><h5>Staff No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-sm">
                                        <span><h5>Staff Name</h5></span>
                                    </div>

                                    {/* <div className="nk-tb-col tb-col-md">
                                        <span><h5>Rank</h5></span>
                                    </div> */}

                                    {/* <div className="nk-tb-col tb-col-md">
                                        <span><h5>File No</h5></span>
                                    </div> */}

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Ippis No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Old Salary PA</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>New Salary PA</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Amount Variation</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Effective Date</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Status</h5></span>
                                    </div>

                                    {/* <div className="nk-tb-col tb-col-md">
                                        <span><h5>Reason for Variation </h5></span>
                                    </div> */}

                                    {/* <div className="nk-tb-col tb-col-md">
                                        <span><h5>Effective Date</h5></span>
                                    </div> */}

                                    <div className="nk-tb-col tb-col-md"><h5>Actions</h5></div>
                                </div>
                                {/* .nk-tb-item */}

                                {variations}

                            </div>
                            {/* .nk-tb-list */}
                        </div>
                    </div>
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={'prev'}
                        nextLabel={'next'}
                        pageCount={pages}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
                <div style={{ paddingBottom: "inherit" }}></div>
            </div>
        );
    }
}