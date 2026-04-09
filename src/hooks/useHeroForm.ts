import { useState } from "react";
import type { Hero } from "../types";


export type HeroFormData = {
    name: string;
    classe: string;
    level: number;
    hp: number;
    isAlive: boolean;
}

export type HeroFormErrors = Partial<Record<keyof HeroFormData, string>>;

const DEFAULT_FORM: HeroFormData = {
     name: "",
    classe: "Guerrier",
    level: 1,
    hp: 100,
    isAlive: true
}

export const CLASSES = ['Guerrier', 'Archère', 'Paladin', 'Nécromancienne', 'Druide'] as const;

export function validate(data:HeroFormData): HeroFormErrors {
    const errors:HeroFormErrors = {};
    if (!data.name.trim()) {
        errors.name = "Le nom est requis"
    }
    else if(data.name.trim().length < 2){
        errors.name = "Minimum de caratères"
    }
    else if(data.name.trim().length > 20){
        errors.name = "Maximum de caratères"
    }
    if (data.level < 1 || data.level > 99)
    errors.level = 'Le niveau doit être entre 1 et 99.';
 
  if (data.hp < 1 || data.hp > 200)
    errors.hp = 'Les PV doivent être entre 1 et 200.';
 
  return errors;
}

type UseHeroFormReturn = {
    form: HeroFormData;
    errors: HeroFormErrors;
    isValid:boolean;
    isSubmitting:boolean;
    handleChange:(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit:(onSuccess:(hero: Omit<Hero, 'id'>)=> Promise<void>) => Promise<void>;
    reset: ()=>void;

}
export function useHeroForm(): UseHeroFormReturn {
    const [form, setForm] = useState<HeroFormData>(DEFAULT_FORM);
    const [errors, setErrors] = useState<HeroFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const currentErrors = validate(form)
    const isValid = Object.keys(currentErrors).length === 0;

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm(prev => ({
            ...prev,
            [name]:type === 'checked' ? checked
                  :type === 'number' ? Number(value)
                  : value
        }));
        setErrors(prev => ({...prev, [name]:undefined}));
    }

    const handleSubmit = async (onSuccess: (hero:Omit<Hero, 'id'>) => Promise<void>) => {
        const validateErrors = validate(form);
        if(Object.keys(validateErrors).length > 0 ){
            setErrors(validateErrors)
            return;
        }
        setIsSubmitting(true);
        try {
         await onSuccess({ ...form, name: form.name.trim() });
      setForm(DEFAULT_FORM);
      setErrors({});
          } finally {
      setIsSubmitting(false);  
        }
    }
    const reset = () => {
    setForm(DEFAULT_FORM);
    setErrors({});
  };
 
  return { form, errors, isValid, isSubmitting, handleChange, handleSubmit, reset };

}