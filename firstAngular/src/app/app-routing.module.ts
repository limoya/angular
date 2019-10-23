import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

const routes: Routes = [
  {
    //默认跳去dashboard且地址重定向，在全匹配的情况下
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },{
    path: 'heroes',
    component: HeroesComponent
  },{
    path: 'dashboard',
    component: DashboardComponent
  },{
    path: 'detail/:id',
    component: HeroDetailComponent
  },/*{
    //通配符
    path: '**'
  }
*/];

@NgModule({
  //forRoot  是因为要在应用的顶级配置这个路由,forRoot方法会提供路由所需的服务商和指令，还会基于浏览器的当前URL执行首次导航
  //第二个参数是配置 enableTracing：true 是可以输出事件，方便调试
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
* ng generate module app-routing --flat --module=app
* 创建时
* --flat 把这个文件放进了 src/app 中，而不是单独的目录中。
* --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。
*
* */
