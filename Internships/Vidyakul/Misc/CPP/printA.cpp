#include <iostream>
using namespace std;

void printA(int n)

{
    char A[n][2*n]; // [n][2n]
    int start,end,i,j,k,mid;
    
    start = n - 1; // n-1
    end = n; // n
    mid = n/2; // n/2

    for (i = 0; i < n; i++)

    {   
        if (start >= 0)

        {
            A[i][start] = '*';
            A[i][end] = '*';
            
            for (k = start + 1 ; k < end; k++)

            {
                if(i == mid)

                {
                    A[i][k] = '*';
                }

                else

                {
                    A[i][k] = ' ';
                }
            }

            start -= 1;
            end += 1;
        }
    }

    for(i = 0; i < n; i++)

    {
        for (j = 0; j < 2 * n; j++)

        {
            if (A[i][j] != '*')
            
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

    printA(n);
}