mod utils;

extern crate nalgebra as na;
extern crate wasm_bindgen_futures;

use na::{DVector, DMatrix};
// use serde::{Serialize, Deserialize};
use std::cmp::max;
use wasm_bindgen::prelude::*;


// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const G : f64 = -9.8;

#[allow(non_snake_case)]
fn A(thetas: &DVector<f64>) -> DMatrix<f64> {
    let n = thetas.len();
    return DMatrix::from_fn(n, n, |r, c| (n - max(r, c)) as f64 / (n - r) as f64 * (thetas[r] - thetas[c]).cos());
}

fn b(thetas: &DVector<f64>, omegas: &DVector<f64>) -> DVector<f64> {
    let mut v = Vec::new();
    let n = thetas.len();
    for i in 0..n {
        let mut b_i = 0.;
        for j in 0..n {
            let coef = (n - max(i, j)) as f64 / (n - i) as f64;
            let delta = coef * (thetas[j] - thetas[i]).sin() * omegas[j] * omegas[j];
            b_i += delta;
        }
        b_i += G * thetas[i].sin();
        v.push(b_i)
    }
    return DVector::from_vec(v);
}

fn lagrange_rhs(thetas_omegas: (&DVector<f64>, &DVector<f64>)) -> (DVector<f64>, DVector<f64>) {
    let (thetas, omegas) = thetas_omegas;
    let x = A(&thetas).lu().solve(&b(&thetas, &omegas)).unwrap();
    //let x = A(&thetas).lu().inverse() * b(&thetas, &omegas);

    (omegas.clone(), x)
}

fn time_step(p: &Pendulum, dt: f64) -> Pendulum {
    let k1 = lagrange_rhs((&p.thetas, &p.omegas));
    let k2 = lagrange_rhs((&(&p.thetas + 0.5 * dt * &k1.0), &(&p.omegas + 0.5 * dt * &k1.1)));
    let k3 = lagrange_rhs((&(&p.thetas + 0.5 * dt * &k2.0), &(&p.omegas + 0.5 * dt * &k2.1)));
    let k4 = lagrange_rhs((&(&p.thetas + 1.0 * dt * &k3.0), &(&p.omegas + 1.0 * dt * &k3.1)));

    let thetas = &p.thetas + (k1.0 + 2.*k2.0 + 2.*k3.0 + k4.0) * dt / 6.;
    let omegas = &p.omegas + (k1.1 + 2.*k2.1 + 2.*k3.1 + k4.1) * dt / 6.;

    Pendulum {
        thetas,
        omegas,
    }
}

fn coordinates(pendula: &mut Pendula) -> *const f64 {
    //let mut coords : Vec<f64> = Vec::new();
    let mut i = 0;
    let mut new_coords : Vec<f64> = Vec::new();
    for p in &pendula.pendula {
        let mut x = 0.;
        let mut y = 0.;   
        let n = p.thetas.len();
        for theta in &p.thetas {
            x += &theta.sin() / (n as f64);
            y += &theta.cos() / (n as f64); 
            new_coords.push(x);
            new_coords.push(y);
            // &pendula.coords[i] = &x;
            // &pendula.coords[i+1] = &y;
            i += 2;
        }
    }
    pendula.coords = new_coords;

    pendula.coords.as_ptr()
}

#[wasm_bindgen]
struct Pendulum {
    thetas: DVector<f64>,
    omegas: DVector<f64>,
}

// impl Pendulum {
//     // pub fn new(n: usize, theta: f64) -> Pendulum {
//     //     let thetas = DVector::from_vec(vec![theta; n]);
//     //     let omegas = DVector::from_vec(vec![0.; n]);

//     //     Pendulum {
//     //         thetas,
//     //         omegas
//     //     }
//     // }

//     // pub fn coordinates(&self) -> Vec<f64> {
//     //     let mut x = 0.;
//     //     let mut y = 0.;
//     //     let n = self.thetas.len();
//     //     let mut coords : Vec<f64> = Vec::new();
//     //     for theta in &self.thetas {
//     //         x += &theta.sin() / n as f64;
//     //         y += &theta.cos() / n as f64; 
//     //         coords.push(x);
//     //         coords.push(y);
//     //     }

//     //     coords
//     // }
// }

#[wasm_bindgen]
pub struct Pendula {
    pendula: Vec<Pendulum>,
    coords: Vec<f64>,
}

#[wasm_bindgen]
impl Pendula {

    #[wasm_bindgen(constructor)]
    pub fn new(val: &JsValue, theta: f64) -> Pendula {
        let ns : Vec<usize> = val.into_serde().unwrap();
        let mut pendula : Vec<Pendulum> = Vec::new();

        let mut total_n = 0;

        for n in ns {
            total_n += n;
            let thetas = DVector::from_vec(vec![theta; n]);
            let omegas = DVector::from_vec(vec![0.; n]);

            let p = Pendulum { thetas, omegas };
            pendula.push(p);
        }

        let coords = vec![0.; 2*total_n];

        Pendula {
            pendula: pendula,
            coords: coords
        }
    }

    pub fn time_step(&mut self, dt: f64) -> *const f64 {
        let mut next : Vec<Pendulum> = Vec::new();

        for p in &self.pendula {
            let new_p = time_step(&p, dt);
            next.push(new_p);
        }
        
        self.pendula = next;

        return coordinates(self);
    }
}