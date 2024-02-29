#include <iostream>
using namespace std;

void printN (int n)

{
    char A[n][2 * n]; // [n][n]
    int start,end,i,j,k,mid;

    for(i = 0; i < n; i++)

    {
        for (j = 0; j < 2 * n; j++)

        {
            // if(i == n - 1)

            // {
            //     A[i][j] = ' ';
            // }
            
            if (j == 0 || j == 2 * n - 2 || (2 * i == j) && (i != n-1)) // j == n - 1
            
            {
                A[i][j] = '*';
            }

            // else if(2 * i == j)

            // {
            //     if(j > 2 * i)

            //     {
            //         A[i][j] = '*'
            //     }                
            // }
            
            else

            {
                A[i][j] = ' ';
            }
        }
    }

    for(i = 0; i < n; i++)

    {
        for (j = 0; j < 2 * n; j++)

        {
            cout << A[i][j];
        }

        cout << endl;
    }
}

int main()

{
    int n;
    
    cout << "Enter the Height of the Letters: ";
    cin >> n;

    cout << endl;

    printN(n);
}