import { Iuser } from "../types/User";
import MilitaryForm, { IMilitaryForm } from '../types/formSchema'; // ייבוא המודל שהגדרת



export const submitService = async (data:IMilitaryForm) => {
    try {
        const newForm = new MilitaryForm(data);
        await newForm.save();

        return newForm; 
    } catch (error) {
        console.log('Error creating military form:' ,error) 
    }
}