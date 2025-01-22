package com.WorkoutWorld.backend.controller;

import com.WorkoutWorld.backend.exception.MealPlannerNotFoundException;
import com.WorkoutWorld.backend.model.MealPlannerModel;
import com.WorkoutWorld.backend.repository.MealPlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class MealPlannerController {
    @Autowired
    private MealPlannerRepository mealPlannerRepository;

    @PostMapping("/mealplan")
    MealPlannerModel newMealPlan(@RequestBody MealPlannerModel newMealPlan) {
        return mealPlannerRepository.save(newMealPlan);
    }

    @GetMapping("/mealplan")
    List<MealPlannerModel> getAllMealPlans() {
        return mealPlannerRepository.findAll();
    }

    @GetMapping("/mealplan/{id}")
    MealPlannerModel getMealPlanById(@PathVariable Long id) {
        return mealPlannerRepository.findById(id)
                .orElseThrow(() -> new MealPlannerNotFoundException(id));
    }

    @PutMapping("/mealplan/{id}")
    MealPlannerModel updateMealPlan(@RequestBody MealPlannerModel updatedMealPlan, @PathVariable Long id) {
        return mealPlannerRepository.findById(id)
                .map(mealPlan -> {
                    mealPlan.setName(updatedMealPlan.getName());
                    mealPlan.setDescription(updatedMealPlan.getDescription());
                    mealPlan.setIngredients(updatedMealPlan.getIngredients());
                    mealPlan.setRecipe(updatedMealPlan.getRecipe());
                    mealPlan.setImage(updatedMealPlan.getImage());
                    mealPlan.setComment(updatedMealPlan.getComment());
                    return mealPlannerRepository.save(mealPlan);
                })
                .orElseThrow(() -> new MealPlannerNotFoundException(id));
    }

    @DeleteMapping("/mealplan/{id}")
    String deleteMealPlan(@PathVariable Long id) {
        if (!mealPlannerRepository.existsById(id)) {
            throw new MealPlannerNotFoundException(id);
        }
        mealPlannerRepository.deleteById(id);
        return "Meal plan with id " + id + " deleted";
    }
}
