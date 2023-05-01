import {  PayloadAction } from "@reduxjs/toolkit"
import { AllProcessProps } from "../../interfaces" 
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "./actionType"

	const INITIAL_STATE: AllProcessProps[] = [{
		processes: [{
			id: '',
			process_name: '',
			company_id: '',
			family_id: '',
			list_emails_responsables: [''],	
		}],
		 families: [{
			id: '',
			family_name: '',
		 }],
		 companies: [{
			id: '',
			company_name: '',
		}],
	},]

	export const processReducer = (state=INITIAL_STATE,action: PayloadAction) => {
		switch(action.type){
			case FETCH_REQUEST:return{
				...state,
				loading:true
			}
			case FETCH_SUCCESS:return{
				loading:false,
				data:action.payload,
				error:''
			}
			case FETCH_FAILURE:return{
				loading:false,
				data:[],
				error:action.payload
			}
			default: return state
		}
	}