#include <18f4550.h>
#fuses INTRC_IO
#use delay ( clock=8M )
#use rs232 ( uart1 , baud = 9600 , bits = 8, parity = N, stop = 1 )

#include <ds1307.c>

#include <2416_Nahum.c>

#byte    RCSTA1=0XFAB
                                                
#define  LCD_ENABLE_PIN PIN_E2                                                
#define  LCD_RS_PIN     PIN_E0                                                     
#define  LCD_RW_PIN     PIN_E1                                                           
#define  LCD_DATA4      PIN_B4                                                     
#define  LCD_DATA5      PIN_B5                                                           
#define  LCD_DATA6      PIN_B6                                                         
#define  LCD_DATA7      PIN_B7


#include <lcd.c>

#define  BTN1  PIN_B3
#define  BTN2  PIN_B2
#define  RED   PIN_C0
#define  BLU   PIN_C1
#define  GRN   PIN_C2
#define  RELE  PIN_A6

#define  B1    PIN_D0
#define  B2    PIN_D1
#define  B3    PIN_D2
#define  B4    PIN_D3
#define  C1    PIN_D4
#define  C2    PIN_D5
#define  C3    PIN_D6
#define  C4    PIN_D7
#define  ENL   PIN_A0

void PRINTLCD ();
void LIMPIA_BUFFER ();
void Direc ();
void SendData ();
void comando ( int );
int x=0;
int8 teclado ( void );
int8 CMD;
int dir = 0;
int dir2 = 0;
int dir3 = 0;
int reb2[2];
int lcd[16];
int com[3];
int send[16];
int i = 0 ;
int y = 0;
int j = 0;
int r=1;
int a=0;
int t=0;

int8 data=0;
int reb[3];

void main (void){

   setup_oscillator(OSC_8MHZ|OSC_INTRC);

   lcd_init();
   //set_tris_d ( 0b11110000 );
   set_tris_b ( 0b11111111 ); 
   set_tris_a ( 0b11111111 );
   //output_c(0);
   for ( ; ; ){
      output_low(ENL);
      //RECIBIR DATOS
      PRINTLCD ();
      //Limpiamos el Buffer
      LIMPIA_BUFFER();
      //Distribución de Datos
      Direc ();
      //RECIBIR TECLADO
      //MANDAR DATOS 
      SendData ();
      //MANDAR MENSAJE AL LCD
         
   }  
}      
   

  /* output_high ( BLU ),
   delay_ms ( 1000 );
   output_low ( BLU );
   delay_ms ( 1000 );
      output_high ( RED ),
   delay_ms ( 1000 );
   output_low ( RED );
   delay_ms ( 1000 );
      output_high ( GRN ),
   delay_ms ( 1000 );
   output_low ( GRN );
   delay_ms ( 1000 );*/
  /* for ( ; ; ){
      if (kbhit () ){
         CMD = getc ( );
         lcd_gotoxy(1,1);
         
         if ( CMD == 0X0a)
            output_high (RED);
         if ( CMD == 0X01)
               output_low (RED);
         if ( CMD == 0X0c)
            output_high (BLU);
         if ( CMD == 0X03)
               output_low (BLU);
            
         }
         lcd_gotoxy ( 1 , 1 );
         printf ( lcd_putc , "mergas%x" , CMD );
      }*/
   

int8 teclado ( void ){
   int8 tecla = 0x10;   
   //ESTO ES EN CASO DE QUE EL TECLADO LO CONECTEMOS DE FORMA QUE LA PARTE BLANCA QUEDE ARRIBA
   // 1 4 7 *
   output_d ( 0b11110111 );
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X31;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X34;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X37;
   }
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X2A;
   }
   //2 5 8 0
    output_d ( 0b11111011 );
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X32;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X35;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X38;
   }
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X30;
   }
   // 3  6 9 #
   output_d ( 0b11111101 );
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X33;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X36;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X39;
   }
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X23;
   }
   //A B C D
   output_d ( 0b11111110 );
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X41;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X42;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X43;
   }
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X44;
   }
   
   
   return tecla;
}
   /*
   //ESTO ES EN CASO DE QUE EL TECLADO LO CONECTEMOS DE FORMA QUE LAS TECLAS QUEDEN ARRIBA
   // 1 4 7 *
   output_d ( 0b11110111 );
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X31;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X34;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X37;
   }
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X2A;
   }
   //2 5 8 0
    output_d ( 0b11111011 );
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X32;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X35;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X38;
   }
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X30;
   }
   // 3  6 9 #
   output_d ( 0b11111101 );
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X33;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X36;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X39;
   }
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X23;
   }
   //A B C D
   output_d ( 0b11111110 );
   if ( input ( C1 ) == FALSE ){
      TECLA = 0X41;
   }
   if ( input ( C2 ) == FALSE ){
      TECLA = 0X42;
   }
   if ( input ( C3 ) == FALSE ){
      TECLA = 0X43;
   }
   if ( input ( C4 ) == FALSE ){
      TECLA = 0X44;
   }*/
   


void LIMPIA_BUFFER ( void ){
   if ( bit_test ( RCSTA1, 1 ) ){
      bit_clear ( RCSTA1, 4 );
      delay_us ( 100 ); 
      
      bit_set ( RCSTA1, 4 );
   }
}

void PRINTLCD (void){
   do{
      if((reb[0]==0x30||reb[0]==0x32) && reb[1]==0x43){
         if(kbhit()){
         lcd[j]=getc();
         j++;
         }
         
         for(j=0;j<16;j++){
            lcd_gotoxy(r,2);
            printf(lcd_putc, "%c",lcd[j]); 
            r++;
         }
      }
   }while(j<16);
}

void RECEP (void){
   if (kbhit()){
      reb[x]=getc();
      if(reb[x]>=30 && reb[x]<0x45){
         lcd_gotoxy(1,1);
         printf(lcd_putc, "SAVE :%x  ",reb[x]);
         delay_ms(500);
         x++;

      }
      if (x>2){
         x=0;    
      }
   }
}

void Direc (void){
   if(reb[0]==0x30 || reb[0]==0x32){
      switch(reb[1]){
         case 0x31: //RELE
            if(reb[2]==0x30){
               output_low (RELE);
            }
            if(reb[2]==0x31){
               output_high (RELE);
            }
         break;
               
         case 0x32: //GRN
            if(reb[2]==0x30){
               output_low (GRN);
            }
            if(reb[2]==0x31){
               output_high (GRN);
            }
         break;
               
         case 0x34: //BLU
            if(reb[2]==0x30){
               output_low (BLU);
            }
            if(reb[2]==0x31){
               output_high (BLU);
            }
         break;
               
         case 0x38: //RED
            if(reb[2]==0x30){
               output_low (RED);
            }
            if(reb[2]==0x31){
               output_high (RED);
            }
         break; 
         default:
      }
   }
}

void SendData (void){
   data=teclado();
   if (data != 0x10){
      while(teclado()!=0x10);
      com[i]=data;
      lcd_gotoxy(1,1);
      printf(lcd_putc,"  Dato:   %x   ",com[i]);
      lcd_gotoxy(1,2);
      printf(lcd_putc,"  %x   %x   %x  ",com[0],com[1],com[2]);
      i++;
      LIMPIA_BUFFER();
      if(i==3){
         i=0;
         OUTPUT_HIGH(ENL);
         delay_ms(100);
         for (y=0;y<3;y++){
            putc(com[y]);
            delay_ms(100);
         }
      }
   } 
}

void LCDMESSAGE (void){
   //Entra
   if((com[0]==0x30||com[0]==0x32)&&com[1]==0x43){
      lcd_gotoxy(1,1);
      prinf(lcd_putc, "Mensaje a Mandar");
      //Se ejecuta mientras t sea menor a 16
      while(t<16){
         //la posición 2 del vector de transmisión lo igualamos al vector del lcd
         com[2]=send[t];
         //Cuando el teclado sea diferente a 0x10 entra
         if (data != 0x10){
            //trampa 
            while(teclado()!=0x10);
            //Igualamos el vector del lcd
            send[t]=data;
            lcd_gotoxy(r,2);
            prinf(lcd_putc, "%c",send[t]);
            r++;
            t++;
            
            LIMPIA_BUFFER();
            if(t==16 && r==17){
               t=0;
               r=1;
               OUTPUT_HIGH(ENL);
               delay_ms(100);
               putc(com[2]);
            }
         }
      }
   }
}
